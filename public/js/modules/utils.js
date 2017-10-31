import { $ } from  './bling';

let spinner;

exports.showProgress = () => {
  if (!spinner) {
    spinner = createSpinner();
  }

  if ($('#progress-overlay')) return 
  const mainContent = $('.inner');
  const body = $('body');

  body.insertBefore(spinner, mainContent);
}

exports.hideProgress = (e) => {
  if (!$('#progress-overlay')) return;
  spinner.classList.add('progress__background--fade-out');
}

function removeAnimation(e) {
  console.log(e);
  if (e.animationName === 'fade-in') {
    spinner.classList.remove('progress__background--fade-in');
  } else {
    spinner.classList.add('progress__background--fade-out');
    const body = $('body');
    body.removeChild(spinner);
  }
}

function createSpinner() {
  const progressOverlayHtml = `<i class="progress__spinner fa fa-spinner fa-pulse fa-3x fa-fw"></i>`;
  const body = $('body');
  const div = document.createElement('div');
  
  div.addEventListener('animationend', removeAnimation);

  div.setAttribute('id', 'progress-overlay');
  div.classList.add('progress__background');
  div.classList.add('progress__background--fade-in');
  div.innerHTML = progressOverlayHtml;

  return div;
}

