import EventEmitter from 'eventemitter3';

export interface SlideEvent {
  slideIndex: number
}

const SLIDE_EVENT_KEY = "slide-event"

const EE = new EventEmitter();

export const addSlideEventHandler = (handler: (ev: SlideEvent) => void) => {
  EE.on(SLIDE_EVENT_KEY, handler);
  return () => {
    EE.removeListener(SLIDE_EVENT_KEY, handler);
  }
}

export const gotoSlide = (slideIndex: number) => {
  EE.emit(SLIDE_EVENT_KEY, { slideIndex } satisfies SlideEvent)
}
