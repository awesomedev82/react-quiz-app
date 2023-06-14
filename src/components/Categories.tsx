import { decode } from "he";
import { useEffect, useState } from "react";
import { QuizCategory } from "../types/QuizCategory";

export default function Categories(props: CategoriesProps) {
  const allCategories = "All";
  const [categories, setCategories] = useState<QuizCategory[]>([
    { id: -1, name: allCategories },
  ]);
  useEffect(() => {
    let isCancelled = false;
    fetchQuizCategories(isCancelled);

    return () => {
      isCancelled = true;
    };
  }, []);

  async function fetchQuizCategories(isCancelled: boolean) {
    try {
      if (!isCancelled) {
        const response = await fetch(`https://opentdb.com/api_category.php`);
        const responseData = await response.json();
        if (!responseData.trivia_categories) {
          throw new Error("no categories found");
        }
        const decodedResults = responseData.trivia_categories.map(
          (category: QuizCategory) => ({
            id: category.id,
            name: decode(category.name),
          })
        );
        decodedResults.unshift({ id: -1, name: allCategories });
        setCategories(decodedResults);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const selectOptionElements = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));
  return (
    <div className="categories-contaier">
      <label className="landing-label-heading">Categories</label>
      <select
        className="categories-select"
        value={props.categoryId}
        onChange={(e) => {
          props.handleCategoryChange(parseInt(e.target.value));
        }}
      >
        {selectOptionElements}
      </select>
      <br />
    </div>
  );
}
type CategoriesProps = {
  handleCategoryChange: (categoryId: number) => void;
  categoryId: number;
};
