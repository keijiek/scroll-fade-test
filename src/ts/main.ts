import '../scss/main.scss';
import scrollEvents from './modules/scrollEvents';

window.onload = () => {
  window.addEventListener('scroll', ()=>{scrollEvents('policies', 'policyItem', 'fadeup')}, false);
}
