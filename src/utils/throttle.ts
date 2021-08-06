export default function throttle(callback: VoidFunction, delay: number) {
    var timeoutHandler:any = null;
    return function () {
        if (timeoutHandler == null) {
            timeoutHandler = setTimeout(function () {
                callback();
                timeoutHandler = null;
            }, delay);
        }
    }
}