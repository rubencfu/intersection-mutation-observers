class View {
  constructor() {
    this.bindAddElement();
    this.bindStopObservation();
    this.initMutationObserver();
    this.getDataFromApi();
  }

  DOM = {
    list: document.getElementById('testList'),
    mutationContainer: document.getElementById('mutation'),
    addElementButton: document.getElementById('addElementButton'),
    stopObservationButton: document.getElementById('stopObservationButton'),
    mutationResults: document.getElementById('mutationResults'),
  };

  mutationsNumber = 1;

  mutationObserver = new MutationObserver((mutations) => {
    console.log(mutations);
    this.DOM.mutationResults.innerText = this.mutationsNumber++;
  });

  bindAddElement = () => {
    this.DOM.addElementButton.addEventListener('click', () => {
      const appendElement = document.createElement('div');
      appendElement.innerText = 'Elemento añadido!';
      this.DOM.mutationContainer.appendChild(appendElement);
    });
  };

  getDataFromApi = () => {
    const data = this.returnData();

    for (const item of data) {
      const newItem = document.createElement('div');
      newItem.innerText = item.text;
      this.DOM.list.appendChild(newItem);
    }

    this.initIntersectionObserver();
  };

  bindStopObservation = () => {
    this.DOM.stopObservationButton.addEventListener('click', () =>
      this.closeMutationObserver()
    );
  };

  initIntersectionObserver = () => {
    const lastListChild = this.DOM.list.lastElementChild;

    const intersectionObserver = new IntersectionObserver(
      ([{ isIntersecting, target }]) => {
        if (isIntersecting) {
          intersectionObserver.disconnect();

          target.style.backgroundColor = 'green';
          this.getDataFromApi();
        }
      },
      {
        threshold: 1,
      }
    );

    intersectionObserver.observe(lastListChild);
  };

  initMutationObserver = () => {
    // We tell the observer which element we want to observe:
    this.mutationObserver.observe(this.DOM.mutationContainer, {
      subtree: true,
      childList: true,
    });
  };

  closeMutationObserver = () => {
    this.mutationObserver.disconnect();
  };

  returnData = () => [
    { value: 0, text: 'dato1' },
    { value: 1, text: 'dato2' },
    { value: 2, text: 'dato3' },
    { value: 3, text: 'dato4' },
    { value: 4, text: 'dato5' },
    { value: 5, text: 'dato6' },
    { value: 6, text: 'dato7' },
  ];
}
