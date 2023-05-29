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

	@MaxSeats(5)
	freeSeats: number = 1;

	@CheckAmountOfFuel
	@CheckAmountOfFuelThis
	checkIsOpen(reason?: string): string {
		return this.isOpen ? 'open' : `close ${reason}`;
	}
}

//Property decorator
function MaxSeats(limit: number) {
	return function (target: undefined, context: ClassFieldDecoratorContext) {
		return function (this: any, newAmount: number) {
			if (newAmount >= 0 && newAmount <= limit) {
				return newAmount;
			} else {
				throw new Error(
					`Incorrect value ${newAmount}, Min: 0 and Max: ${limit}`
				);
			}
		};
	};
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
console.log(car);
console.log(car.checkIsOpen('service time'));
