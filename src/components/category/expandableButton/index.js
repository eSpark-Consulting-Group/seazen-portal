// import React, { useState } from "react";
// import Category from "./Category";
// import styles from "./style.module.css";

// const CategoryContainer = () => {
//   const [expandedCategory, setExpandedCategory] = useState(null);

//   const handleExpandCategory = (categoryName) => {
//     setExpandedCategory(categoryName);
//   };

//   return (
//     <div className={styles.categoryContainer}>
//       <Category
//         iconPath="/assets/img/Catering.png"
//         categoryName="Category 1"
//         expandCategory={() => handleExpandCategory("Category 1")}
//       />
//       <Category
//         iconPath="/assets/img/Catering.png"
//         categoryName="Category 2"
//         expandCategory={() => handleExpandCategory("Category 2")}
//       />
//       <div className={styles.expandedCategory}>
//         {expandedCategory && (
//           <div className={styles.categoryButtons}>
//             <button className={styles.categoryButton}>Button 1</button>
//             <button className={styles.categoryButton}>Button 2</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryContainer;
