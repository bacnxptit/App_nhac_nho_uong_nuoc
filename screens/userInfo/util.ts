import {
  ActivityLevelType,
  ClimateType,
  GenderType,
} from '@/storage/userinfo/type';
import { ActivityOptionType, ClimateOptionType } from './type';

export const ActivityLevelOptions: ActivityOptionType[] = [
  {
    icon: require('@/assets/images/activity/lazy.png'),
    title: 'Ít vận động',
    description: 'Hoạt động thể chất hạn chế, chủ yếu ngồi hoặc nằm',
    id: 'sendatry',
  },
  {
    icon: require('@/assets/images/activity/walking.png'),
    title: 'Hoạt động nhẹ',
    description:
      'Một số vận động trong ngày. Chẳng hạn như đi bộ nhẹ hoặc thỉnh thoảng đứng.',
    id: 'light_activity',
  },
  {
    icon: require('@/assets/images/activity/running.png'),
    title: 'Hoạt Động Vừa Phải',
    description:
      'Tập thể dục hoặc hoạt động thể chất thường xuyên, chẳng hạn như chạy bộ hoặc đạp xe.',
    id: 'moderate_activity',
  },
  {
    icon: require('@/assets/images/activity/lifting.png'),
    title: 'Rất năng động',
    description:
      'Hoạt động thể chất hoặc tập luyện cường độ cao, chẳng hạn như nâng tạ nặng hoặc tập luyện cường độ cao',
    id: 'very_active',
  },
];

export const ClimateOptions: ClimateOptionType[] = [
  {
    icon: require('@/assets/images/climate/sun.png'),
    title: 'Nóng',
    id: 'hot',
  },
  {
    icon: require('@/assets/images/climate/temperate.png'),
    title: 'Ôn hòa',
    id: 'temperate',
  },
  {
    icon: require('@/assets/images/climate/cold.png'),
    title: 'Lạnh',
    id: 'cold',
  },
];

interface WaterIntakeInput {
  weight: number; // in kg
  height: number; // in cm
  age: number;
  gender: GenderType;
  activityLevel: ActivityLevelType;
  wakeUpTime: string; // 'HH:MM' format (24-hour)
  sleepTime: string; // 'HH:MM' format (24-hour)
  weather: ClimateType;
}

export const calculateWaterIntake = ({
  weight,
  height,
  age,
  gender,
  activityLevel,
  wakeUpTime,
  sleepTime,
  weather,
}: WaterIntakeInput): number => {
  let waterIntake = weight * 0.035;

  {if (gender === 'male') {
    waterIntake += 0.5;
  } else if (gender === 'female') {
    waterIntake += 0.3;
  } else {
    waterIntake += 0.5;
  }}

  if (height > 175) {
    waterIntake += 0.3;
  } else if (height < 160) {
    waterIntake -= 0.2;
  }
  switch (activityLevel) {
    case 'light_activity':
      waterIntake += 0.3;
      break;
    case 'moderate_activity':
      waterIntake += 0.5;
      break;
    case 'very_active':
      waterIntake += 1;
      break;
    case 'sendatry':
    default:
      break;
  }

  if (age > 30 && age <= 55) {
    waterIntake -= 0.2;
  } else if (age > 55) {
    waterIntake -= 0.4;
  }

  switch (weather) {
    case 'hot':
      waterIntake += 0.7;
      break;
    case 'cold':
      waterIntake -= 0.3;
      break;
    case 'temperate':
    default:
      break;
  }

  const wakeHour = parseInt(wakeUpTime.split(':')[0]);
  const sleepHour = parseInt(sleepTime.split(':')[0]);
  const totalAwakeHours =
    sleepHour > wakeHour ? sleepHour - wakeHour : 24 - wakeHour + sleepHour;

  if (totalAwakeHours > 16) {
    waterIntake += 0.5;
  } else if (totalAwakeHours < 12) {
    waterIntake -= 0.3;
  }

  if (waterIntake < 1) {
    waterIntake = 1;
  }

  const waterIntakeInMl = waterIntake * 1000;

  return Math.round(waterIntakeInMl); // Return result rounded to nearest milliliter
};
