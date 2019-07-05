/**
 * 展示商品
 * 支持搜索、过滤
 */


/**
 * 展示商品类别
 */
class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

/**
 * 展示具体的行内容
 */
class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{ color: 'red' }}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

/**
 * 展示整个表格
 */
class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {

            /**
             * 搜索产品名
             */
            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }

            /**
             * 检查库存
             */
            if (inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return (
            <table>
                <thread>
                    <tr>
                        <th>产品名字</th>
                        <th>价格</th>
                    </tr>
                </thread>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

/**
 * 搜索按钮
 */
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInstockChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type='text'
                    placeholder="搜索 ..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    只显示还有库存的产品
            </p>
            </form>
        );
    };
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInstockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

const PRODUCTS = [
    { category: '体育用品', price: '$49.99', stocked: true, name: 'Football' },
    { category: '体育用品', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: '体育用品', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: '电子产品', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: '电子产品', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: '电子产品', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);
