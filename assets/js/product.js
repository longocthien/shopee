const dataUrl = 'https://longocthien.github.io/shopee/shopee.json';

fetch(dataUrl)
    .then((response) => response.json())
    .then(renderItem)
    .then(handlePagination);

function shuffer() {
    fetch(dataUrl)
        .then((response) => response.json())
        .then((list) => {
            list = list.sort(() => Math.random() - 0.5);
            return list;
        })
        .then(renderItem)
        .then(handlePagination);
}

// main product

function renderItem(items) {
    var listProduct = document.getElementById('list-product');
    var htmls = items.map(function (item) {
        return `
        <div data="${item.id}" class="col l-2-4 m-3 c-6 home-product-item">
            <a class="home-product-item-link" href="#!">
                <div class="home-product-item__img" style="background-image: url(./assets/img/home/${item.id}.PNG);"></div>
                <div class="home-product-item__info">
                    <h4 class="home-product-item__name">${item.name}</h4>
                    <div class="home-product-item__price">
                        <div class="price-block">
                            <label class="home-product-item__price-old">${item.oldPrice}đ</label>
                            <label class="home-product-item__price-new">${item.newPrice}đ</label>
                            <i class="home-product-item__ship fas fa-shipping-fast"></i>
                        </div>
                    </div>
                    <div class="home-product-item__footer">
                        <div class="home-product-item__save">
                            <input type="checkbox" id="heart-save-${item.id}">
                            <label for="heart-save-${item.id}" class="far fa-heart"></label>
                        </div>
                        <div class="home-product-item__rating-star">
                            <i class="star-checked far fa-star"></i>
                            <i class="star-checked far fa-star"></i>
                            <i class="star-checked far fa-star"></i>
                            <i class="star-checked far fa-star"></i>
                            <i class="star-uncheck far fa-star"></i>
                        </div>
                        <div class="home-product-item__saled">Đã bán ${item.saled}</div>
                    </div>
                    <div class="home-product-item__origin">${item.origin}</div>
                    <div class="home-product-item__favourite">
                        ${item.shop}
                    </div>
                    <div class="home-product-item__sale-off">
                        <div class="home-product-item__sale-off-value">${item.saleOff}%</div>
                        <div class="home-product-item__sale-off-label">GIẢM</div>
                    </div>
                </div>
                <div class="home-product-item-footer">Tìm sản phẩm tương tự</div>
            </a>
        </div>`;
    });
    listProduct.innerHTML = htmls.join('');
}

function checkPageArrow() {
    const currentPage = parseInt(
        document.querySelector('.pagination-item--active a').textContent
    );
    const paginationLinks = document.querySelectorAll('.pagination-item-link');

    paginationLinks.forEach((link, index) => {
        if (index === 0 && currentPage === 1) {
            link.classList.add('pagination-item-link--disable');
            link.removeAttribute('href');
        } else if (index === paginationLinks.length - 1 && currentPage === 8) {
            link.classList.add('pagination-item-link--disable');
            link.removeAttribute('href');
        } else {
            link.classList.remove('pagination-item-link--disable');
            link.href = '#!';
        }
    });
}

function handlePagination() {
    var paginationItem = document.querySelectorAll('.pagination-item');
    var paginationLength = paginationItem.length;
    checkPageArrow();
    for (var i = 0; i < paginationLength; i++) {
        if (i != 0 && i != 4 && i != paginationLength - 1) {
            // handle active button
            var isActive = document.querySelector('.pagination-item--active a');
            if (isActive.attributes.href) {
                isActive.attributes.removeNamedItem('href');
            } else {
                var paginationItemLink = document.querySelectorAll(
                    '.pagination-item-link'
                );
                paginationItemLink[i].setAttribute('href', '#!');
            }
            // handle other button
            paginationItem[1].onclick = function () {
                var content = this.querySelector('a').textContent;
                var paginationItemLink = document.querySelectorAll(
                    '.pagination-item-link'
                );
                if (content >= 2) {
                    paginationItemLink[1].textContent =
                        Number(paginationItemLink[1].textContent) - 1;
                    paginationItemLink[2].textContent =
                        Number(paginationItemLink[2].textContent) - 1;
                    paginationItemLink[3].textContent =
                        Number(paginationItemLink[3].textContent) - 1;
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    paginationItem[2].classList.add('pagination-item--active');
                    shuffer();
                }
                if (content < 2) {
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    this.classList.add('pagination-item--active');
                }
                checkPageArrow();
            };
            paginationItem[2].onclick = function () {
                document
                    .querySelector('.pagination-item--active')
                    .classList.remove('pagination-item--active');
                this.classList.add('pagination-item--active');
                shuffer();
                checkPageArrow();
            };
            paginationItem[3].onclick = function (e) {
                var content = this.querySelector('a').textContent;
                var paginationItemLink = document.querySelectorAll(
                    '.pagination-item-link'
                );
                if (content < 7) {
                    paginationItemLink[1].textContent =
                        Number(paginationItemLink[1].textContent) + 1;
                    paginationItemLink[2].textContent =
                        Number(paginationItemLink[2].textContent) + 1;
                    paginationItemLink[3].textContent =
                        Number(paginationItemLink[3].textContent) + 1;
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    paginationItem[2].classList.add('pagination-item--active');
                    shuffer();
                }
                if (content == 7) {
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    this.classList.add('pagination-item--active');
                    e.preventDefault();
                }
                checkPageArrow();
            };
            paginationItem[5].onclick = function (e) {
                var content = document.querySelector(
                    '.pagination-item--active a'
                ).textContent;
                if (content != 8) {
                    var paginationItemLink = document.querySelectorAll(
                        '.pagination-item-link'
                    );
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    this.classList.add('pagination-item--active');
                    paginationItemLink[1].textContent = 5;
                    paginationItemLink[2].textContent = 6;
                    paginationItemLink[3].textContent = 7;
                    shuffer();
                    checkPageArrow();
                } else {
                    e.preventDefault();
                }
            };
        } else if (i == 0 || i == paginationLength - 1) {
            var paginationItemLink = document.querySelectorAll(
                '.pagination-item-link'
            );
            // arrow left
            paginationItem[0].onclick = function () {
                if (
                    document.querySelector('.pagination-item--active a')
                        .textContent == 8
                ) {
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    paginationItem[3].classList.add('pagination-item--active');
                } else if (
                    document.querySelector('.pagination-item--active a')
                        .textContent == 2
                ) {
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    paginationItem[1].classList.add('pagination-item--active');
                } else if (
                    document.querySelector('.pagination-item--active a')
                        .textContent > 1
                ) {
                    paginationItemLink[1].textContent =
                        Number(paginationItemLink[1].textContent) - 1;
                    paginationItemLink[2].textContent =
                        Number(paginationItemLink[2].textContent) - 1;
                    paginationItemLink[3].textContent =
                        Number(paginationItemLink[3].textContent) - 1;
                    shuffer();
                }
                checkPageArrow();
            };
            // arrow right
            paginationItem[paginationLength - 1].onclick = function () {
                if (
                    document.querySelector('.pagination-item--active a')
                        .textContent == 7
                ) {
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    paginationItem[5].classList.add('pagination-item--active');
                } else if (
                    document.querySelector('.pagination-item--active a')
                        .textContent == 1
                ) {
                    document
                        .querySelector('.pagination-item--active')
                        .classList.remove('pagination-item--active');
                    paginationItem[2].classList.add('pagination-item--active');
                } else if (
                    document.querySelector('.pagination-item--active a')
                        .textContent < 7
                ) {
                    paginationItemLink[1].textContent =
                        Number(paginationItemLink[1].textContent) + 1;
                    paginationItemLink[2].textContent =
                        Number(paginationItemLink[2].textContent) + 1;
                    paginationItemLink[3].textContent =
                        Number(paginationItemLink[3].textContent) + 1;
                    shuffer();
                }
                checkPageArrow();
            };
        }
    }
}

// mobile - category - item;
var mobileCategory = document.querySelectorAll('.mobile-category-item');
mobileCategory.forEach(function (item) {
    item.onclick = function () {
        var value = item.getAttribute('value');
        fetch(dataUrl)
            .then((response) => response.json())
            .then((products) => {
                const sortedByMaker = sortByMaker(value)(products);
                const sortedByType = sortByType(value)(products);
                return [sortedByMaker, sortedByType];
            })
            .then((sortedProducts) => {
                const mergedProducts = sortedProducts.flat(); // gộp hai kết quả trả về thành một mảng duy nhất
                renderItem(mergedProducts); // render dữ liệu đã được sắp xếp
            });
    };
});
// category

const headerCategoryItem = document.querySelectorAll('.header__sort-item');

headerCategoryItem.forEach((item) => {
    item.onclick = function () {
        const headerCategoryActive = document.querySelector(
            '.header__sort-item--active'
        );
        headerCategoryActive.classList.remove('header__sort-item--active');
        this.classList.add('header__sort-item--active');
        if (this.textContent.trim() == 'Bán chạy') {
            fetch(dataUrl)
                .then((response) => response.json())
                .then(sortDescendingBySales)
                .then(renderItem);
        } else if (this.textContent.trim() == 'Giá') {
            fetch(dataUrl)
                .then((response) => response.json())
                .then(sortAscendingByPrice)
                .then(renderItem);
        } else {
            shuffer();
        }
    };
});

// // filter items by category

var PcCategoryItem = document.querySelectorAll('.category-group-item');

var checkedValues = [];

PcCategoryItem.forEach(function (itemClicked) {
    itemClicked.addEventListener('click', function (e) {
        var input = e.target
            .closest('.category-group-item')
            .querySelector('input[type="checkbox"]');

        input.checked = !input.checked;

        if (input.checked) {
            checkedValues.push(input.value);
            console.log(checkedValues);
        } else {
            checkedValues = checkedValues.filter(
                (value) => value !== input.value
            );
            console.log(checkedValues);
        }

        fetch(dataUrl)
            .then((response) => response.json())
            .then((products) => {
                let filteredProducts = sortByTypes(products, checkedValues);
                return filteredProducts;
            })
            .then((filteredProducts) => {
                if (
                    checkedValues.length === 0 ||
                    filteredProducts.some(
                        (product) => product.type === 'novalue'
                    )
                ) {
                    shuffer();
                } else {
                    renderItem(filteredProducts);
                }
            });
    });
});

// filter items by star rating

var ratingStar = document.querySelectorAll('.star-checked, .star-uncheck');
var ratingStarInput = document.querySelectorAll('.rating-star label');

ratingStarInput.forEach(function (itemClicked) {
    itemClicked.addEventListener('click', function (e) {
        var input = e.target
            .closest('.rating-star')
            .querySelector('input[type="checkbox"]');
        input.checked = !input.checked;

        shuffer();
    });
});

ratingStar.forEach(function (itemClicked) {
    itemClicked.addEventListener('click', function (e) {
        var input = e.target
            .closest('.rating-star')
            .querySelector('input[type="checkbox"]');
        input.checked = !input.checked;

        shuffer();
    });
});

// filter items by check

var mobileCategoryItemCheckbox = document.querySelectorAll(
    'input[type="checkbox"]:not(#mobile-search):not(#nav__mb--input)'
);

mobileCategoryItemCheckbox.forEach(function (itemClicked) {
    itemClicked.addEventListener('click', function (e) {
        e.target.checked = !e.target.checked;

        shuffer();
    });
});

// filter theo thứ tự sắp xếp
var homeFilter = document.querySelectorAll('.home-filter-btn');

homeFilter.forEach(function (itemClicked) {
    itemClicked.onclick = function () {
        var homeFilterActive = document.querySelector(
            '.home-filter-btn.btn--primary'
        );
        homeFilterActive.classList.remove('btn--primary');
        this.classList.add('btn--primary');
        if (this.textContent.trim() == 'Bán chạy') {
            fetch(dataUrl)
                .then((response) => response.json())
                .then(sortDescendingBySales)
                .then(renderItem);
        } else {
            shuffer();
        }
    };
});

// Tải lại trang
var applyButton = document.querySelector('.apply-btn');
var refreshButton = document.querySelector('.category-group--margin');
applyButton.onclick = function () {
    shuffer();
};
refreshButton.onclick = function () {
    location.reload();
};

// sắp xếp theo thứ tự tăng dần hoặc giảm dần

// ============================================================================
// giá tăng dần
function sortAscendingByPrice(products) {
    products.sort(function (a, b) {
        return (
            parseInt(a.newPrice.replaceAll('.', '')) -
            parseInt(b.newPrice.replaceAll('.', ''))
        );
    });
    return products;
}

// giảm dần
function sortDescendingByPrice(products) {
    products.sort(function (a, b) {
        return (
            parseInt(b.newPrice.replaceAll('.', '')) -
            parseInt(a.newPrice.replaceAll('.', ''))
        );
    });
    return products;
}

// bán chạy
const sortDescendingBySales = (products) =>
    products.sort((a, b) => {
        const aSaled = a.saled.endsWith('k')
            ? parseInt(a.saled.replaceAll(',', '').replaceAll('k', '')) * 100
            : parseInt(a.saled.replaceAll(',', ''));

        const bSaled = b.saled.endsWith('k')
            ? parseInt(b.saled.replaceAll(',', '').replaceAll('k', '')) * 100
            : parseInt(b.saled.replaceAll(',', ''));
        return bSaled - aSaled;
    });

//  theo loại (type)
// ========Đơn========
const sortByMaker = (maker) => (products) =>
    products.filter((product) => product.maker === maker);

const sortByType = (type) => (products) =>
    products.filter((product) => product.type === type);
// ========Cộng dồn========
const sortByTypes = (products, types) => {
    return products.filter((product) => {
        var productTypes = types.includes(product.type);
        var productOrigins = types.includes(product.origin);
        var productShips = types.includes(product.ship);
        var productMakers = types.includes(product.maker);
        var productNoValues = types.includes('noValue');
        var productShop = types.includes(product.shop);

        return (
            productTypes +
            productOrigins +
            productShips +
            productMakers +
            productNoValues +
            productShop
        );
    });
};

// ============================================================================

// filter theo tăng giá, giảm giá
var priceParent = document.querySelector('.home-filter-sort');
var priceSortList = document.querySelector('.home-filter-sort-list');
var priceBtn = document.querySelector('.home-filter-sort-btn');

priceParent.onmouseenter = function () {
    priceSortList.classList.add('home-filter-sort-list--visible');
    var homeFilterSort = document.querySelectorAll(
        '.home-filter-sort-item-link'
    );
    homeFilterSort.forEach(function (itemClicked) {
        itemClicked.onclick = function (e) {
            priceBtn.innerText = e.target.textContent;
            priceBtn.style.color = 'var(--primary-color)';
            priceSortList.classList.remove('home-filter-sort-list--visible');
            if (e.target.textContent.trim() === 'Giá: Thấp đến Cao') {
                fetch(dataUrl)
                    .then((response) => response.json())
                    .then(sortAscendingByPrice)
                    .then(renderItem);
            } else {
                fetch(dataUrl)
                    .then((response) => response.json())
                    .then(sortDescendingByPrice)
                    .then(renderItem);
            }
        };
    });
};
priceParent.onmouseleave = function () {
    priceSortList.classList.remove('home-filter-sort-list--visible');
};

// chuyển trang
var homeFilterPage = document.querySelectorAll('.home-filter-page-btn');

homeFilterPage[0].onclick = function () {
    var currentPage = document.querySelector('.home-filter-page-now');
    if (currentPage.textContent != 1) {
        currentPage.textContent = Number(currentPage.textContent) - 1;
        shuffer();
    }
    if (currentPage.textContent != 14) {
        homeFilterPage[1].classList.remove('home-filter-page-btn--disable');
    }
    if (currentPage.textContent == 1) {
        homeFilterPage[0].classList.add('home-filter-page-btn--disable');
    }
};

homeFilterPage[1].onclick = function () {
    var currentPage = document.querySelector('.home-filter-page-now');
    if (currentPage.textContent != 14) {
        currentPage.textContent = Number(currentPage.textContent) + 1;
        shuffer();
    }
    if (currentPage.textContent != 1) {
        homeFilterPage[0].classList.remove('home-filter-page-btn--disable');
    }
    if (currentPage.textContent == 14) {
        homeFilterPage[1].classList.add('home-filter-page-btn--disable');
    }
};
