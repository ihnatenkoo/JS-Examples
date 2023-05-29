interface ICar {
	fuel: string;
	isOpen: boolean;
	freeSeats: number;
}

@ChangeDoorStatus(true)
@ChangeFuelCount(75)
class MyCar implements ICar {
	fuel: string = '50%';
	isOpen: boolean;
	freeSeats: number = 3;

	checkIsOpen() {
		return this.isOpen ? 'open' : 'close';
	}
}

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
