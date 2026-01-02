import { COLOR_THEME } from '@/style/ColorTheme';
import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type DropdownSelectorProps = {
  setSelectedOption: (option: string) => void;
  selectedOption: string;
  options: string[];
  label: string;
};
const DropdownSelector = ({
  selectedOption,
  setSelectedOption,
  label,
  options,
}: DropdownSelectorProps) => {
  const flatListRef = useRef<FlatList>(null);
  const ITEM_HEIGHT = 50; 
  const VISIBLE_ITEMS = 7; 

  useEffect(() => {
    const findIndex = options.findIndex(
      item => item.toString() === selectedOption,
    );
    setTimeout(() => {
      scrollToHeight(findIndex);
    }, 500);
  }, []);
  const scrollToHeight = (index: number) => {
    if (flatListRef.current && index !== -1) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
      setSelectedOption(options[index].toString());
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    options?.[index]?.toString() &&
      setSelectedOption(options[index].toString());
  };

  return (
    <View style={styles.container}>
      {/* FlatList with height options */}
      <FlatList
        data={options}
        ref={flatListRef}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT} 
        decelerationRate="fast" 
        onScroll={handleScroll}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingTop: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
          paddingBottom: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
        }}
        onScrollToIndexFailed={(error: any) => {
          flatListRef.current?.scrollToOffset({
            offset: error.averageItemLength * error.index,
            animated: false,
          });
          setTimeout(() => {
            if (options.length !== 0 && flatListRef.current !== null) {
              flatListRef.current.scrollToIndex({
                index: error.index,
                animated: false,
              });
            }
          }, 100);
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => scrollToHeight(index)}>
            <View
              style={[
                styles.heightItem,
                selectedOption === item.toString() &&
                styles.selectedHeightContainer,
              ]}>
              <Text
                style={
                  selectedOption === item.toString()
                    ? styles.selectedHeightText
                    : styles.heightText
                }>
                {item}{' '}
                <Text style={{ fontSize: 14, color: '#333' }}>
                  {selectedOption === item.toString() ? label : ''}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heightItem: {
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  heightText: {
    fontSize: 18,
    color: '#333',
  },
  selectedHeightContainer: {
    borderTopWidth: 2,
    backgroundColor: '#fff', 
    borderBottomWidth: 2,
    borderColor: COLOR_THEME.base.primary,
  },
  selectedHeightText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR_THEME.base.primary,
  },

  blueBoxText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DropdownSelector;
