import Search from './models/Search';
import { elements } from './views/base';


/* GLOBAL STATE OF THE APP
    * - Search object
    * - Current recipe object
    * - Shopping list object
    * - Likes recipes
*/
const state = {};




/* SEARCH CONTROLLER */

const controlSearch = async () => {
    // 1) Get query from view
    const query = 'pizza';

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results in UI
        console.log(state.search.result);
    }
};


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});