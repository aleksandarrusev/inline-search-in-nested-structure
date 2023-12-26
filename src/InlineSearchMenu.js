import './App.css';
import data from './data/data.json';
import {useState} from "react";

function InlineSearchMenu() {
    const [categoriesToShow, setCategoriesToShow] = useState(() => data);

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const results = getResults(data, keyword);
        setCategoriesToShow(results);
    };

    const getResults = (categories, keyword) => {
        return categories.reduce((resultArray, category) => {
            // Copy the category, in order to avoid mutating the argument directoy
            const categoryCopy = {...category};
            // If there is a match, push it to the resultArray.
            if (category.name.toLowerCase().includes(keyword)) {
                resultArray.push(categoryCopy);
            // Else, if the category has children, search for match inside its children
            } else if (category?.children) {
                const subResults = getResults(category.children, keyword);
                // If there are any matches in the children, push the whole category(from top level) to the results array,
                // so that the array structure can be preserved
                if (subResults.length) {
                    categoryCopy.children = subResults;
                    resultArray.push(categoryCopy);
                }
            }
            return resultArray;
        }, []);
    };

    return (
        <div className="App">
            <input type="text" placeholder="Enter keyword" onChange={handleSearch}/>
            <ul>
                {categoriesToShow.map(parentCategory => (
                    <li key={parentCategory.name}>
                        {parentCategory.name}
                        {parentCategory?.children && (
                            <ul>
                                {parentCategory.children.map(childCategory => (
                                    <li key={childCategory.name}>
                                        {childCategory.name}
                                        {childCategory?.children && (
                                            <ul>
                                                {childCategory.children.map(subChildCategory => (
                                                    <li key={subChildCategory.name}>{subChildCategory.name}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InlineSearchMenu;
