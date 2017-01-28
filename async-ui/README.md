# Asynchronous User Interfaces

This is my attempt at mimicking the iOS-style KVO-based MVC through JavaScript's
EventEmitter. We have *n* models which each have *m* tasks. Each task updates
the Model's ViewController when it's completed. The ViewController then redraws
itself in its **toString** (the View) and LogUpdate picks up the newly rendered
View and displays it on the screen every *t* milliseconds.
