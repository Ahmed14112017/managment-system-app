type RangeParams = {
    start?: number;
    end: number;
    step?: number;
  };

export const range = ({ start, end, step = 1 }: RangeParams) => {
    const output = [];
  
    if (start) {
      for (let i = start; i <= end; i += step) {
        output.push(i);
      }
    }
  
    if (!start) {
      for (let i = 0; i <= end; i += step) {
        output.push(i);
      }
    }
  
    return output;
  };

type PaginationParams = {
    currentPage: number;
    totalNumberOfPages: number;
    requiredNumberOfPages?: number;
  };
  


  export const paginate = ({
    currentPage,
    totalNumberOfPages,
    requiredNumberOfPages = 5, // Default to showing 5 pages
  }: PaginationParams) => {
    const half = Math.floor(requiredNumberOfPages / 2);
  
    // If the total pages are less than or equal to the required pages, return all pages
    if (totalNumberOfPages <= requiredNumberOfPages) {
      return range({ start: 1, end: totalNumberOfPages });
    }
  
    // If the current page is near the beginning
    if (currentPage <= half) {
      return range({ start: 1, end: requiredNumberOfPages });
    }
  
    // If the current page is near the end
    if (currentPage + half >= totalNumberOfPages) {
      return range({
        start: totalNumberOfPages - requiredNumberOfPages + 1,
        end: totalNumberOfPages,
      });
    }
  
    // Otherwise, show pages centered around the current page
    return range({
      start: currentPage - half,
      end: currentPage + half,
    });
  };