import { mount } from 'enzyme';
import Product from './product';

import { restaurants } from '../../fixtures';

const product = restaurants[0].menu[0];

function render(props) {
  const wrapper = mount(<Product {...props} />);
  const getByDataId = (dataId) => wrapper.find(`[data-id="${dataId}"]`);

  return {
    getProductsCount: () => getByDataId('product').length,
    getAmount: () => getByDataId('product-amount').text(),
    increase: () => getByDataId('product-increment').simulate('click'),
    decrease: () => getByDataId('product-decrement').simulate('click'),
  };
}

describe('Product', () => {
  it('should render', () => {
    const testKit = render({ product });
    expect(testKit.getProductsCount()).toBe(1);
  });

  it('should init from 0 amount', () => {
    const testKit = render({ product });
    expect(testKit.getAmount()).toBe('0');
  });

  it('should increment amount', () => {
    const testKit = render({ product });
    testKit.increase();
    expect(testKit.getAmount()).toBe('1');
  });

  it('should fetch data on mount', () => {
    const fn = jest.fn();
    render({ product, fetchData: fn });
    expect(fn).toBeCalledWith(product.id);
  });

  it('should init with amount 2', () => {
    const testKit = render({ product, initialCount: 2 });
    expect(testKit.getAmount()).toBe('2');
  });

  it('should decrement amount', () => {
    const testKit = render({ product, initialCount: 4 });
    testKit.decrease();
    expect(testKit.getAmount()).toBe('3');
  });

  it("shouldn't decrement with 0 amount", () => {
    const testKit = render({ product });
    testKit.decrease();
    expect(testKit.getAmount()).toBe('0');
  });
});
