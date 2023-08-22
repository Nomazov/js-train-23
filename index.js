// Композит (Composite) — це патерн програмування, який дозволяє створювати структуру об'єктів у вигляді дерева, де кожен об'єкт може бути окремим елементом або групою об'єктів.
// Ця структура називається "деревоподібною" через ієрархію "один-багато".

class ContentContainer {
    elements = [];

    addElement(element) {
        this.elements.push(element);
    }
    removeElement(element) {
        const index = this.elements.indexOf(element);
        if (!index !== -1) {
            this.elements.splice(element, 1);
        }
    }
}

class Message extends ContentContainer {
    constructor(content) {
        super();
        this.content = content
    }

    display() {
        console.log(`${this.content}`)

        for (const element of this.elements) {
            element.display();
        }
    }
}

class Article extends ContentContainer {
    constructor(title) {
        super();
        this.title = new Object(title)
    }

    display() {
        console.log(`Стаття: ${this.title}`)
        for (const element of this.elements) {
            element.display();
        }
    }
}

console.log("Завдання 1 ====================================");

const article = new Article("Навчальна стаття");

article.addElement(new Message("Дуже корисна стаття"));
article.addElement(new Message("Дякую за чудовий матеріал!"));

article.elements[0].addElement(new Message("Відповідь: Згоден!"));

article.display();

console.log(article.elements);






// Муха (Flyweight) — це патерн програмування, основна ідея якого полягає в тому, щоб спільно використовувати об'єкт-одиночка
// замість створення окремих унікальних об'єктів для кожного випадку використання

class Group {
    static #groups = {};

    constructor(name) {
        this.name = name
    }

    static create(name) {

        if (!this.#groups[name]) {
            this.#groups[name] = new Group(name);
        }

        return this.#groups[name];
    }

    display() {
        console.log(`Група: ${this.name}`);
    }
}

class Product {
    constructor(name, group) {
        this.name = name;
        this.group = group;
    }

    display() {
        console.log(`Продукт: ${this.name}, Група: ${this.group.name}`);
    }
}

console.log("Завдання 2 ====================================");

const electronics = Group.create("Електроніка");
const books = Group.create("Книги");
const electronics2 = Group.create("Електроніка");

console.log(electronics, books, electronics2);
console.log(electronics === electronics2);

const product1 = new Product("Ноутбук", electronics);
const product2 = new Product("Навушники", electronics);
const product3 = new Product("Воно", books);
const product4 = new Product("Смартфон", Group.create("Електроніка"));

product1.display();
product2.display();
product3.display();
product4.display();

console.log(product1.group === product4.group);

const list = [product1, product2, product3, product4].filter(
    (product) => product.group === Group.create("Електроніка")
);

console.log(list);









// Шаблонний метод (Template Method) — це патерн програмування, який визначає загальну структуру алгоритму, залишаючи певні кроки реалізації підкласам.
class TeaMaker {
    makeTea() {
        this.boilWater();
        this.addTeaLeaves();
        this.#steepTea();
        this.pourIntoCup();
        this.addCondiments();
        this.serveTea();
    }

    boilWater() {
        console.log("Кип'ятимо воду....")
    }
    addTeaLeaves() {
        console.log("Додаємо чайні листки....")
    }
    #steepTea() {
        console.log("Заварюємо чай....")
    }
    pourIntoCup() {
        console.log("Переливаємо чай в чашку....")
    }
    addCondiments() { }
    serveTea() {
        console.log("Чай подається!")
    }
}

class GreenTeaMaker extends TeaMaker {
    constructor() {
        super()
    }

    addCondiments() {
        console.log("Додаємо мед, щоб приготувати зелений чай...")
    }
}

class BlackTeaMaker extends TeaMaker {
    constructor() {
        super()
    }

    addCondiments() {
        console.log("Додаємо мед, щоб приготувати чорний чай...")
    }
}

console.log("Завдання 3 ====================================");

const greenTeaMaker = new GreenTeaMaker();
greenTeaMaker.makeTea();

const blackTeaMaker = new BlackTeaMaker();
blackTeaMaker.makeTea();









// Відвідувач (Visitor) — це патерн програмування, який дозволяє додавати нові операції до групи об'єктів, не змінюючи самі об'єкти.
// Відвідувач розділяє алгоритм від представлення об'єктів, що дозволяє додавати нові операції, не змінюючи класи цих об'єктів.
class Letter {
    constructor(title, text) {
        this.title = title
        this.text = text
    }
}

class Picture {
    constructor(title, size) {
        this.title = title
        this.size = size
    }
}

class Movie {
    constructor(title, duration) {
        this.title = title
        this.duration = duration
    }
}

class Portfolio {
    elements = [];

    addElement(element) {
        this.elements.push(element)
    }

    readLetter(letter) {
        console.log(`Лист: ${letter.title}, Розмір: ${letter.text.length} символів`)
    }
    readPicture(picture) {
        console.log(`Картина: ${picture.title}, Розмір: ${picture.size} KB`)
    }
    readMovie(movie) {
        console.log(`Фільм: ${movie.title}, Тривалість: ${movie.duration} хвилин`)
    }

    readElements() {
        for (const element of this.elements) {
            if (element instanceof Letter) {
                this.readLetter(letter);
            }

            if (element instanceof Picture) {
                this.readPicture(picture);
            }

            if (element instanceof Movie) {
                this.readMovie(movie);
            }
        }
    }
}

console.log("Завдання 4 ====================================");

const myPortfolio = new Portfolio();

const letter = new Letter("My Letter", "Hello, this is a letter.");
const picture = new Picture("My Picture", 2048);
const movie = new Movie("My Movie", 120);

myPortfolio.addElement(letter);
myPortfolio.addElement(picture);
myPortfolio.addElement(movie);

console.log(myPortfolio.elements);

myPortfolio.readElements();








// Адаптер (Adapter) — це патерн програмування, який дозволяє об'єктам з інтерфейсом несумісним з іншими об'єктами працювати разом,
// перетворюючи інтерфейс одного об'єкта на інтерфейс, очікуваний іншим об'єктом.
class BankTransfer {
    initiateTransfer(amount) {
        const calculatedAmount = this.calculateFee(amount)
        console.log(`Ініціюємо банківський переказ: $${calculatedAmount}`)
    }

    calculateFee(amount) {
        return amount * 1.02;
    }
}

class WalletTransfer {
    processTransfer(amount) {
        console.log(`Здійснюємо переказ з гаманця: $${amount}`)
    }
}

class TransferAdapter {
    constructor(WalletTransfer) {
        this.WalletTransfer = WalletTransfer
    }

    initiateTransfer(amount) {
        const calculatedAmount = this.calculateFee(amount)
        return this.WalletTransfer.processTransfer(calculatedAmount)
    }

    calculateFee() {
        return amount * 1.2
    }
}
console.log("Завдання 5 ====================================");

const purchase1 = new BankTransfer();
purchase1.initiateTransfer(1000);

const purchase2 = new BankTransfer();
purchase2.initiateTransfer(10);










// Стратегія (Strategy) — це патерн програмування, який дозволяє визначати різні алгоритми та забезпечує можливість обміну їх під час виконання програми.

class Basket {
    constructor(discountPlan) {
        this.discountPlan = discountPlan
    }

    goods = [];

    addGood(good) {
        this.goods.push(good)
    }

    calculateTotalPrice() {
        const totalPrice = this.goods.reduce((total, good) => total + good.price, 0);
        return this.discountPlan.applyDiscount(totalPrice);
    }
}

class RegularDiscountPlan extends Basket {
    applyDiscount(price) {
        return price * 0.9;
    }
}

class VIPDiscountPlan extends Basket {
    applyDiscount(price) {
        return price * 0.8;
    }
}

class NewClientDiscountPlan extends Basket {
    applyDiscount(price) {
        return price * 0.95;
    }
}

console.log("Завдання 6 ====================================");

const basket1 = new Basket(new NewClientDiscountPlan());

basket1.addGood({ name: "Product 1", price: 100 });
basket1.addGood({ name: "Product 2", price: 50 });

console.log(basket1.calculateTotalPrice());










// Ітератор (Iterator) — це патерн програмування, який надає спосіб послідовного доступу до елементів колекції без розкриття його внутрішньої структури.
class Employee {
    constructor(name, position, salary) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
}

class EmployeeGroup {
    employees = [];

    addEmployee(employee) {
        this.employees.push(employee)
    }
}

class EmployeeIterator {
    #employees;
    #currentIndex;

    constructor(employeeGroup) {
        this.#employees = employeeGroup.employees
        this.#currentIndex = 0
    }

    #hasNext() {
        return this.#currentIndex < this.#employees.length;
    }

    next() {
        if (this.hasNext()) {
            const employee = this.#employees[this.#currentIndex];
            this.#currentIndex++;
            return employee;
        } else {
            return null;
        }
    }

    list() {
        const names = this.#employees.map(employee => employee.name);
        return names.join(", ");
    }
}

console.log("Завдання 7 ====================================");

const employeeGroup = new EmployeeGroup();

employeeGroup.addEmployee(new Employee("John Doe", "Manager", 5000));
employeeGroup.addEmployee(new Employee("Jane Smith", "Developer", 4000));

const employeeIterator = new EmployeeIterator(employeeGroup);

console.log(employeeIterator.list());









// Медіатор (Mediator) — це патерн програмування, який визначає об'єкт, який інкапсулює взаємодію між групою об'єктів. Медіатор сприяє слабкій залежності між цими об'єктами,
class User {
    constructor(name, messenger) {
        this.name = name
        this.messenger = messenger
    }

    sendMessage(message) {
        console.log(`${this.name} відправив повідомлення ${message}`)
        return this.messenger.sendMessage(message)
    }

    receiveMessage(user, message) {
        console.log(`${this.name} отримав повідомлення від ${user.name}: ${message}`)
    }
}

class SMSMessenger {
    static sendMessage(message) {
        console.log(`Відправлено SMS: ${message}`)
    }
}

class EmailMessenger {
    static sendMessage(message) {
        console.log(`Відправлено Email: ${message}`)
    }
}

console.log("Завдання 7 ====================================");

const john = new User("John", SMSMessenger);
const jane = new User("Jane", EmailMessenger);

john.sendMessage("Привіт!"); // Виведе: Відправлено SMS: [John]: Привіт!

jane.sendMessage("Привіт!"); // Виведе: Відправлено Email: [Jane]: Привіт!