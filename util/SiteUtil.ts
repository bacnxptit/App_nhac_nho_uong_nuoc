export const formatedCurrentDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`
    }`;
};

/**
 * Chỉ viết hoa chữ cái đầu tiên của chuỗi
 * @param str - Chuỗi cần format
 * @returns Chuỗi với chữ cái đầu tiên viết hoa, các chữ cái còn lại viết thường
 */
export const capitalizeFirstLetter = (str: string | null | undefined): string => {
  if (!str || str.trim().length === 0) {
    return '';
  }
  const trimmed = str.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};
