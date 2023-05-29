interface ICar {
	fuel: string;
	isOpen: boolean;
	freeSeats: number;
}

@ChangeDoorStatus(false)
@ChangeFuelCount(75)
class MyCar implements ICar {
	fuel: string = '50%';
	isOpen: boolean;
	freeSeats: number = 3;

	@CheckAmountOfFuel
	@CheckAmountOfFuelThis
	checkIsOpen(reason?: string): string {
		return this.isOpen ? 'open' : `close ${reason}`;
	}
}

//Method decorator typing with this
function CheckAmountOfFuelThis(
	target: any,
	context: ClassMethodDecoratorContext
) {
	return function (this: any, ...args: any[]) {
		console.log(this.fuel);

		return target.apply(this, args);
	};
}

//Method decorator typing without this
function CheckAmountOfFuel<T, A extends any[], R>(
	target: (this: T, ...args: A) => R,
	context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
) {
	return function (this: T, ...args: A): R {
		console.log(`${String(context.name)} was executed`);

		return target.apply(this, args);
	};
}

//Class decorator
function ChangeDoorStatus(status: boolean) {
	return <T extends { new (...args: any[]): {} }>(
		target: T,
		context: ClassDecoratorContext<T>
	) => {
		return class extends target {
			isOpen = status;
		};
	};
}

//Class decorator
function ChangeFuelCount(value: number) {
	return <T extends { new (...args: any[]): {} }>(
		target: T,
		context: ClassDecoratorContext<T>
	) => {
		return class extends target {
			fuel = `${value}%`;
		};
	};
}

const car = new MyCar();
console.log(car.checkIsOpen('service time'));
