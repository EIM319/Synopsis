import { unmountComponentAtNode } from 'react-dom';
import { render, act } from '@testing-library/react';

// Plugin
import TawkMessengerReact from '../index';


let container = null;
jest.spyOn(console, 'error').mockReturnValue(true);


describe('Install tawk-messenger-react', () => {
	beforeEach(() => {
		container = document.createElement('script');
		document.body.appendChild(container);
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	describe('Should throw an error in missing required properties', () => {
		it('when propertyId and widgetId are not defined', () => {
			act(() => {
				render(<TawkMessengerReact/>, container);
			});
			expect(console.error).toHaveBeenCalledTimes(3);
		});

		it('when widgetId only is not defined', () => {
			act(() => {
				render(
					<TawkMessengerReact
						propertyId="62c6f24ab0d10b6f3e7b49fe"/>,
					container
				);
			});
			expect(console.error).toHaveBeenCalledTimes(1);
		});

		it('when propertId only is not defined', () => {
			act(() => {
				render(
					<TawkMessengerReact
						widgetId="1g7ci4tc6"/>,
					container
				);
			});

			expect(console.error).toHaveBeenCalledTimes(1);
		});
	});
});