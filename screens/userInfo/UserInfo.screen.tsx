import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import Timeline from './component/Timeline';
import UserNameForm from './component/UserNameForm';
import GenderForm from './component/GenderForm';
import HeightForm from './component/HeightForm';
import WeightForm from './component/WeightForm';
import AgeForm from './component/AgeForm';
import WakeUpTimeForm from './component/WakeUpTimeForm';
import BedTimeForm from './component/BedTimeForm';
import ActivityLevelForm from './component/ActivityLevelForm';
import DailyGoalForm from './component/DailyGoalForm';
import { useAuth } from '@/context/UserAuthContext';
import ClimateForm from './component/ClimateForm';
import GeneratingPersonalisedForm from './component/GeneratingPersonalisedForm';
import { UserInfo } from '@/storage/userinfo/type';
import { router } from 'expo-router';
import * as LocalStorage from '@/storage/localStorage';

const UserInfoScreen = () => {
  const [step, setStep] = useState(1);
  const { handleOnboardingComplete, user } = useAuth();

  const [tempProfileData, setTempProfileData] = useState<Partial<UserInfo>>({});
  const [refreshing, setRefreshing] = useState(false);

  const reloadUserData = async () => {
    try {
      const localUserInfo = await LocalStorage.getUserInfoLocal();
      if (localUserInfo) {
        setTempProfileData({
          ...localUserInfo,
          height: Number(localUserInfo.height) || 0,
          weight: Number(localUserInfo.weight) || 0,
          age: Number(localUserInfo.age) || 0,
        });
      } else if (user && user.userId) {
        setTempProfileData({
          ...user,
          height: Number(user.height) || 0,
          weight: Number(user.weight) || 0,
          age: Number(user.age) || 0,
        });
      }
    } catch (error) {
      console.error('Error reloading user data:', error);
      if (user && user.userId) {
        setTempProfileData({
          ...user,
          height: Number(user.height) || 0,
          weight: Number(user.weight) || 0,
          age: Number(user.age) || 0,
        });
      }
    }
  };

  useEffect(() => {
    if (user && user.userId) {
      setTempProfileData({
        ...user,
        height: Number(user.height) || 0,
        weight: Number(user.weight) || 0,
        age: Number(user.age) || 0,
      });
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadUserData();
    setRefreshing(false);
  };

  const updateLocalInfo = (field: keyof UserInfo | 'sleepingTime', value: any) => {
    setTempProfileData(prev => ({
      ...prev,
      [field === 'sleepingTime' ? 'bedTime' : field]: value,
    }));
  };

  const handleSubmit = async (finalDailyGoal?: number) => {
    try {
      if (!tempProfileData.userId) {
        console.error('No userId found in tempProfileData');
        return;
      }

      const finalData: Partial<UserInfo> = {
        ...tempProfileData,
        dailyGoal: finalDailyGoal || tempProfileData.dailyGoal || 2000,
      };

      const payload: Omit<UserInfo, 'userId' | 'dailyIntake' | 'isCompleted'> = {
        name: finalData.name || 'User',
        gender: finalData.gender || 'preferNotToSay',
        height: Number(finalData.height) || 0,
        weight: Number(finalData.weight) || 0,
        age: Number(finalData.age) || 0,
        wakeUpTime: finalData.wakeUpTime || '07:00',
        bedTime: finalData.bedTime || '23:00',
        activity: finalData.activity || 'sendatry',
        climate: finalData.climate || 'temperate',
        dailyGoal: finalData.dailyGoal || 2000,
        cupSize: finalData.cupSize || 200,
      };

      await handleOnboardingComplete(payload as any);

      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };


  const renderProfileForm = () => {
    if (step === 1) {
      return (
        <UserNameForm
          initialValue={tempProfileData?.name}
          updateName={name => {
            updateLocalInfo('name', name); // Cập nhật cục bộ
            setStep(2);
          }}
        />
      );
    }
    if (step === 2) {
      return (
        <AgeForm
          updateAge={age => {
            updateLocalInfo('age', Number(age));
            setStep(3);
          }}
          initialValue={tempProfileData?.age ? tempProfileData.age.toString() : undefined}
        />
      );
    }
    if (step === 3) {
      return (
        <GenderForm
          initialValue={tempProfileData?.gender === 'Other' ? undefined : (tempProfileData?.gender as any)}
          updateGender={gender => {
            updateLocalInfo('gender', gender);
            setStep(4);
          }}
        />
      );
    }
    if (step === 4) {
      return (
        <HeightForm
          gender={tempProfileData?.gender === 'Other' ? undefined : (tempProfileData?.gender as any)}
          initialValue={tempProfileData?.height ? tempProfileData.height.toString() : undefined}
          updateHeight={height => {
            updateLocalInfo('height', Number(height));
            setStep(5);
          }}
        />
      );
    }
    if (step === 5) {
      return (
        <WeightForm
          gender={tempProfileData?.gender === 'Other' ? undefined : (tempProfileData?.gender as any)}
          initialValue={tempProfileData?.weight ? tempProfileData.weight.toString() : undefined}
          updateWeight={weight => {
            updateLocalInfo('weight', Number(weight));
            setStep(6);
          }}
        />
      );
    }
    if (step === 6) {
      const parseTime = (timeStr?: string) => {
        if (!timeStr) return undefined;
        const [hrs, min] = timeStr.split(':');
        return { hrs: hrs || '07', min: min || '00' };
      };
      return (
        <WakeUpTimeForm
          updateWakeUpTime={wakeupTime => {
            updateLocalInfo('wakeUpTime', `${wakeupTime.hrs}:${wakeupTime.min}`);
            setStep(7);
          }}
          initialValue={parseTime(tempProfileData?.wakeUpTime)}
        />
      );
    }
    if (step === 7) {
      const parseTime = (timeStr?: string) => {
        if (!timeStr) return undefined;
        const [hrs, min] = timeStr.split(':');
        return { hrs: hrs || '20', min: min || '00' };
      };
      return (
        <BedTimeForm
          updateBedTime={sleepingTime => {
            updateLocalInfo('bedTime', `${sleepingTime.hrs}:${sleepingTime.min}`);
            setStep(8);
          }}
          initialValue={parseTime(tempProfileData?.bedTime)}
        />
      );
    }
    if (step === 8) {
      return (
        <ActivityLevelForm
          updateActivityLevel={activityLevel => {
            updateLocalInfo('activity', activityLevel);
            setStep(9);
          }}
          initialValue={tempProfileData?.activity}
        />
      );
    }
    if (step === 9) {
      return (
        <ClimateForm
          updateClimate={climate => {
            updateLocalInfo('climate', climate);
            setStep(10);
          }}
          initialValue={tempProfileData?.climate}
        />
      );
    }
    if (step === 10) {
      return (
        <GeneratingPersonalisedForm
          userInfo={tempProfileData as UserInfo}
          personalisedPlanDone={waterIntake => {
            updateLocalInfo('dailyGoal', waterIntake);
            setStep(11);
          }}
        />
      );
    }

    if (step === 11) {
      const convertToDailyGoalType = (value?: number) => {
        if (value === undefined) return undefined;
        return { value, type: 'ml' as const };
      };
      return (
        <DailyGoalForm
          initialValue={convertToDailyGoalType(tempProfileData?.dailyGoal)}
          submitAllInfo={async (dailyGoalValue?: number) => {
            const finalGoal = dailyGoalValue || tempProfileData?.dailyGoal || 2000;
            await handleSubmit(finalGoal);
          }}
          updateDailyGoal={(dailyGoal) => {
            const goalInMl = dailyGoal.type === 'L' ? dailyGoal.value * 1000 : dailyGoal.value;
            updateLocalInfo('dailyGoal', goalInMl);
          }}
        />
      );
    }

    return <View style={{ flex: 1, backgroundColor: '#F5F5F5' }} />;
  };

  const isDisplayingTimeline = step < 10 && step > 0;
  const stepsWithFlatList = [2, 3, 4, 5, 6, 7, 8, 9];
  const hasFlatList = stepsWithFlatList.includes(step);

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(prev => prev - 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {isDisplayingTimeline && (
        <View style={{ backgroundColor: '#F5F5F5', zIndex: 10 }}>
          <Timeline step={step} handleBack={handleBack} />
        </View>
      )}
      {hasFlatList ? (
        <View style={{ flex: 1 }}>
          <View key={step} style={{ flex: 1, marginTop: isDisplayingTimeline ? 0 : 30 }}>
            {renderProfileForm()}
          </View>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']}
              tintColor="#007AFF"
            />
          }
        >
          <View key={step} style={{ flex: 1, marginTop: isDisplayingTimeline ? 0 : 30 }}>
            {renderProfileForm()}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserInfoScreen;