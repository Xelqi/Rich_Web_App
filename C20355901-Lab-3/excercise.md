## 1. Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern?  What are streams useful for modeling and when might you use them in Rich Web development?

A streams is data that is created, processed and consumed in an incremental fashion.Stream abstraction is just breaking down a resource you want into smaller chunks over time that you want to receive, send or transform.

The relationship between streams and observers invloves a subject which has a list of dependents(observers) and the notifies them of state change(stream of events). So an observer subsribes to a subject and then gets notified when its state changes e.g on click of a button

They are useful as they help with asynchronous functionality, they increase performance when memory is limited, they are good for when you have to load a big amount of data in the frontend and dont want the user to wait so it loads bit by bit. Making the experience more seameless.


## 2. Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides? 

I havent used streams for an API yet but going off of notes it if you make a fetch request to an endpoint if it is successfull you can expose a readable stream in the body and then a reader can read it using .getReader() or cancel using .cancel(). A benefit of streams compared to promises is they are able to handle data sources that provide more than one value e.g mouse movements.
Streams are usefull when a change is done and you want other objects to respond to this change they will recieve and react to it if they are listening due to Propagation of change.
The downsides of using streams is when your doing a basic application with simple interactions using reactive programming and streams would be overkill and also hard for a beginner to do.

## 3. Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this? 

If task A,B,C try to change a value and there is no lock or que in place the outcome can be unexpected. If possible you should avoid them sharing global state as it makes it difficult to debug, just like with buffers & threads in java. You should have try have a observable for each task so it has its own independant stream. If possible try implement a lock system so one process has access at a time and then the next one is able to access after the lock is removed.