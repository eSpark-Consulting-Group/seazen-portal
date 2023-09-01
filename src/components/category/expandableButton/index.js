// import React, { useState } from 'react';
// import Category from './Category';

// const CategoryContainer = () => {
//   const [expandedCategory, setExpandedCategory] = useState(null);

//   const handleExpandCategory = (categoryName) => {
//     setExpandedCategory(categoryName);
//   };

//   return (
//     <div className="category-container">
//       <Category
//         iconPath="/assets/img/Catering.png"
//         categoryName="Category 1"
//         expandCategory={() => handleExpandCategory('Category 1')}
//       />
//       <Category
//         iconPath="/assets/img/Catering.png"
//         categoryName="Category 2"
//         expandCategory={() => handleExpandCategory('Category 2')}
//       />
//       <div className="expanded-category">
//         {expandedCategory && (
//           <div className="category-buttons">
//             <button className="category-button">Button 1</button>
//             <button className="category-button">Button 2</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryContainer;
