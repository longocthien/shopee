// Đối tượng Validator
function Validator(options) {
    // Lấy thẻ cha của elements
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(
            inputElement,
            options.formGroupSelector
        ).querySelector(options.errorSelector);

        // var errorMessage = rule.test(inputElement.value);  loại bỏ do có vòng for rồi
        var errorMessage;

        // Lấy ra các rule của selector
        var rules = selectorRules[rule.selector]; // selectors in form

        // Lặp qua từng rule và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }

            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(
                'invalid'
            );
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove(
                'invalid'
            );
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với js
                if (typeof options.onSubmit === 'function') {
                    var enableInput = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInput).reduce(function (
                        values,
                        input
                    ) {
                        switch (input.type) {
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    // values[input.name] = '';
                                    return values;
                                }

                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'radio':
                                values[input.name] = formElement.querySelector(
                                    'input[name="' + input.name + '"]:checked'
                                ).value;
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    },
                    {});

                    options.onSubmit(formValues);
                }
                // Trường hợp Submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        };

        // Lặp qua mỗi rule và xử lý (Lắng nghe sự kiện)
        options.rules.forEach(function (rule) {
            // Lưu lại các rules cho mỗi input

            // lần 2
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                // lần 1
                selectorRules[rule.selector] = [rule.test];
            }

            // Lấy nhiều input lặp qua
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý trường hợp blur ra ngoài
                inputElement.onblur = function () {
                    //value = inputElement.value;
                    //test func = rule.test
                    validate(inputElement, rule);
                };

                // Xử lý khi người dùng nhập vào ô input
                inputElement.oninput = function () {
                    var errorElement = getParent(
                        inputElement,
                        options.formGroupSelector
                    ).querySelector('.form-message');
                    errorElement.innerText = '';

                    getParent(
                        inputElement,
                        options.formGroupSelector
                    ).classList.remove('invalid');
                };
            });
        });
    }
}

// Định nghĩa các rules
// Nguyên tắc của rules:
// 1. Khi có lỗi => trả ra message lỗi
// 1. Khi hợp lệ => không trả ra gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)
                ? undefined
                : message || 'Trường này phải là email';
        },
    };
};


Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/;
            return regex.test(value)
                ? undefined
                : message || 'Số điện thoại không hợp lệ';
        },
    };
};

Validator.isPhoneOrEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)
                ? undefined
                : message || 'Số điện thoại hoặc email không hợp lệ';
        },
    };
};





Validator.minLength = function (selector, minlength, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= minlength
                ? undefined
                : message || `Vui lòng nhập tối thiểu ${minlength} kí tự`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue()
                ? undefined
                : message || 'Giá trị nhập vào không chính xác';
        },
    };
};
