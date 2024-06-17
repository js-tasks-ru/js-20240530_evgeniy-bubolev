export default class NotificationMessage {
  static currentShownElement = null;

  message = '';
  duration = 0;
  type = '';

  element;


  constructor(
    message = '',
    {
      duration = 0,
      type = '',
    } = {}
  ) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.element = this.createElement();
  }

  show(targetElement) {
    if (NotificationMessage.currentShownElement != null) {
      NotificationMessage.currentShownElement.remove();
    }

    NotificationMessage.currentShownElement = this;

    if (targetElement) {
      targetElement.innerHTML = '';
      targetElement.appendChild(this.element);
    }

    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    NotificationMessage.currentShownElement = null;
    this.element.remove();
  }

  createElement() {
    const element = document.createElement('div');
    element.setAttribute('class', 'notification ' + this.type);

    //timer
    const timer = document.createElement('div');
    timer.setAttribute('class', 'timer');

    //inner-wrapper
    const innerWrapper = document.createElement('div');
    innerWrapper.setAttribute('class', 'inner-wrapper');

    //notification-header
    const notificationHeader = document.createElement('div');
    notificationHeader.setAttribute('class', 'notification-header');
    notificationHeader.textContent = this.type;

    //notification-body
    const notificationBody = document.createElement('div');
    notificationBody.setAttribute('class', 'notification-body');
    notificationBody.textContent = this.message;


    element.appendChild(timer);
    element.appendChild(innerWrapper);
    innerWrapper.appendChild(notificationHeader);
    innerWrapper.appendChild(notificationBody);

    return element;
  }

  destroy() {
    this.remove();
  }
}
