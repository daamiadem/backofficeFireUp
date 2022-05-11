import { combineReducers } from "redux";
import users from "./slices/usersSlice";
import articles from "./slices/articlesSlice";
import offers from "./slices/offersSlice";
import tickets from "./slices/ticketsSlice";

const reducers = combineReducers({
  users,
  articles,
  offers,
  tickets,

});
export default reducers;
