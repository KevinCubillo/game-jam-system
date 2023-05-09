class EventManager {
    constructor() {
        this.observers = [];
    }

    subscribe(user) {
        this.observers.push(user);
    }

    unsubscribe(user) {
        this.observers = this.observers.filter(observer => observer !== user);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

module.exports = EventManager;