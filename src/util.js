export const SERVER_URl = 'localhost:8800/';
export const isAuth = localStorage.getItem('token') != null;

export const clickOutsideHandler = (e, className, stateSetter) => {
  if (!e.target.closest(className)) {
    stateSetter(false);
  }
}