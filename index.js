//1 Events
const el = document.getElementById("el");
const btn = document.createElement("button");
btn.setAttribute("style", "margin: 5px; width: 300px; height: 50px;")
btn.innerText = "Clickme"
el.appendChild(btn);

const div = document.createElement("div");
div.setAttribute("style", "margin: 5px; width: 300px; height: 50px; line-height: 50px; background: grey; text-align:center");
div.innerText = "Mouseenterme";
el.appendChild(div);

const inpt = document.createElement("input");
inpt.setAttribute("style", "margin: 5px; width: 290px; height: 50px; text-align:center");
inpt.setAttribute("placeholder", "Focusme")
el.appendChild(inpt);

function fireEventTimes(num) {
    let count = num;
    return function (eventType, handler, node) {
        const eventHandler = e => {
            count--
            handler(e);
            e.target.value = `EventType: ${eventType}, eventCount: ${count}`;
            e.target.innerText = `EventType: ${eventType}, eventCount: ${count}`;
            if (count === 0) {
                node.removeEventListener(eventType, eventHandler);
            }
        };
        node.addEventListener(eventType, eventHandler);
    }
}

const twoTimesEvent = fireEventTimes(2);
twoTimesEvent('click',() => console.log('hello'), btn);
const tenTimesEvent = fireEventTimes(10);
tenTimesEvent('mouseenter',() => console.log('hello'), div);
const threeTimesEvent = fireEventTimes(3);
threeTimesEvent('focus',() => console.log('hello'), inpt);
const threeTimesEvent1 = fireEventTimes(3);
threeTimesEvent1('blur',() => console.log('hello'), inpt);

//2 Поиск
const directories = [
    {
        dir: {name: "root"}
    },
    {
        dir: { name: "child" }
    },
    {
        dir: [
            {
                dir: { name: "John" }
            },
            {
                dir: { name: "hello" }
            },
            {
                dir: [
                    {
                        dir: { name: "nested" }
                    },
                    {
                        dir: [
                            {
                                dir: { name: "nested" }
                            },
                            {
                                dir: { name: "one" }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

function search(value, array = directories, count = 0) {
    const arr = [];
    const obj = {};
    count += 1;
    for (let elem of array) {
        const {dir} = elem;
        if (Array.isArray(dir)) {
            const res = search(value, dir, count);
            arr.push(...res)
        }
        else {
            const {name} = dir;
            if (name.toLowerCase() === value.toLowerCase()) {
                obj.name = name;
                obj.level = count;
                arr.push(obj)
            }
        }
    }
    return arr
}
console.log("nested", search("NESTeD"));
console.log("hello", search("heLLo"));

//3 Таймер
class Timer {
    constructor(time, callback) {
        this.time = time;
        this.timeoutId = null;
        this.callback = callback;
    }
    // это тоже работает
    /*start() {
        if (this.time < 0) {
            return
        }
        this.callback(this.time);
        this.time--;
        setTimeout(() => {
            this.start();
        }, 1000)
    }
    stop() {
        this.time = -1;
    }*/
    start() {
        this.callback(this.time);
        this.time--;
        this.timeoutId = setTimeout(() => {
            this.start();
            if (this.time < 0) {
                clearTimeout(this.timeoutId)
            }
        }, 1000)
    }
    stop() {
        clearTimeout(this.timeoutId)
    }
}

const timerCallback = time => console.log(time)
const timer = new Timer(10,timerCallback)

const wait = ms => 
    new Promise(resolve => {
        setTimeout(() => resolve(`Promise`), ms)
    })

//timer.start()

async function timerCheckFunction() {
    timer.start();
    await wait(5000);
    timer.stop();
}

timerCheckFunction()

//4 flatMap
Array.prototype.flatMap = function(callback) {
    let arr = [];
    let arr1 = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(callback(this[i]))
    }
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            for (let j = 0; j < arr[i].length; j++) {
                arr1.push(arr[i][j])
            }
        }
        else {
            arr1.push(arr[i])
        }
    }
    return arr1
}

const arr = [1, 2, 3, 4]
const arr1 = arr.flatMap(x => [x+x])
const arr2 = arr.flatMap(x => [[x+x]])
//console.log("arr1", arr1)
//console.log("arr2", arr2)



