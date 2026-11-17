document.addEventListener("DOMContentLoaded", function () {
    setupMobileNav();
    setupContactForm();
    setupFaqAccordion();
    setupQuickView();
    setupCustomerLoginForm();
    setupAdminLoginForm();
    setupAdminLogout();
    setupAdminProducts();
    setupAdminOrders();
    setupAdminMessages();
});

function hasBootstrapComponent(componentName) {
    return typeof window.bootstrap !== "undefined" && typeof window.bootstrap[componentName] === "function";
}

function setText(element, value) {
    if (element) {
        element.textContent = value;
    }
}

function setupMobileNav() {
    if (hasBootstrapComponent("Collapse")) {
        return;
    }

    document.querySelectorAll(".navbar-toggler[data-bs-target]").forEach(function (button) {
        button.addEventListener("click", function () {
            const target = document.querySelector(button.getAttribute("data-bs-target"));

            if (!target) {
                return;
            }

            const isOpen = target.classList.toggle("show");

            button.setAttribute("aria-expanded", String(isOpen));
        });
    });
}

function setupContactForm() {
    const form = document.getElementById("contactForm");
    const name = document.getElementById("cname");
    const email = document.getElementById("cemail");
    const message = document.getElementById("cmessage");

    if (!form || !name || !email || !message) {
        return;
    }

    const nameError = document.getElementById("cnameError");
    const emailError = document.getElementById("cemailError");
    const messageError = document.getElementById("cmessageError");
    const successMessage = document.getElementById("contactSuccess");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        setText(nameError, "");
        setText(emailError, "");
        setText(messageError, "");
        setText(successMessage, "");

        if (name.value.trim().length < 2) {
            setText(nameError, "Please enter at least 2 characters.");
            isValid = false;
        }

        if (!emailPattern.test(email.value.trim())) {
            setText(emailError, "Please enter a valid email address.");
            isValid = false;
        }

        if (message.value.trim().length < 10) {
            setText(messageError, "Message must contain at least 10 characters.");
            isValid = false;
        }

        if (isValid) {
            setText(successMessage, "Thank you! Your message has been received.");
            form.reset();
        }
    });
}

function setupFaqAccordion() {
    const accordion = document.getElementById("faqAccordion");

    if (!accordion || hasBootstrapComponent("Collapse")) {
        return;
    }

    accordion.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (button) {
        button.addEventListener("click", function () {
            const answer = document.querySelector(button.getAttribute("data-bs-target"));

            if (!answer) {
                return;
            }

            const willOpen = !answer.classList.contains("show");

            accordion.querySelectorAll(".accordion-collapse.show").forEach(function (openAnswer) {
                openAnswer.classList.remove("show");
            });
            accordion.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (otherButton) {
                otherButton.classList.add("collapsed");
                otherButton.setAttribute("aria-expanded", "false");
            });

            if (willOpen) {
                answer.classList.add("show");
                button.classList.remove("collapsed");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
}

function setupQuickView() {
    const modal = document.getElementById("productQuickView");
    const image = document.getElementById("qvImage");
    const tag = document.getElementById("qvTag");
    const title = document.getElementById("qvTitle");
    const description = document.getElementById("qvDesc");
    const price = document.getElementById("qvPrice");

    if (!modal || !image || !tag || !title || !description || !price) {
        return;
    }

    function updateQuickView(button) {
        if (!button) {
            return;
        }

        image.src = button.dataset.img || "";
        image.alt = button.dataset.title || "Product";
        setText(tag, button.dataset.tag || "");
        setText(title, button.dataset.title || "");
        setText(description, button.dataset.desc || "");
        setText(price, button.dataset.price || "");
    }

    if (hasBootstrapComponent("Modal")) {
        modal.addEventListener("show.bs.modal", function (event) {
            updateQuickView(event.relatedTarget);
        });

        return;
    }

    document.querySelectorAll("[data-quick-view]").forEach(function (button) {
        button.addEventListener("click", function () {
            updateQuickView(button);
        });
    });
}

function setupCustomerLoginForm() {
    const form = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if (!form || !username || !password) {
        return;
    }

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const loginSuccess = document.getElementById("loginSuccess");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        setText(usernameError, "");
        setText(passwordError, "");
        setText(loginSuccess, "");

        if (username.value.trim() === "") {
            setText(usernameError, "Please enter your username.");
            isValid = false;
        }

        if (password.value.trim() === "") {
            setText(passwordError, "Please enter your password.");
            isValid = false;
        }

        if (isValid) {
            setText(loginSuccess, "Login successful.");
            form.reset();
        }
    });
}

function setupAdminLoginForm() {
    const form = document.getElementById("adminLoginForm");
    const username = document.getElementById("adminUsername");
    const password = document.getElementById("adminPassword");

    if (!form || !username || !password) {
        return;
    }

    const usernameError = document.getElementById("adminUsernameError");
    const passwordError = document.getElementById("adminPasswordError");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        setText(usernameError, "");
        setText(passwordError, "");

        if (username.value.trim() === "") {
            setText(usernameError, "Please enter your username.");
            isValid = false;
        }

        if (password.value.trim() === "") {
            setText(passwordError, "Please enter your password.");
            isValid = false;
        }

        if (isValid) {
            window.location.href = "admin-dashboard.html";
        }
    });
}

function setupAdminLogout() {
    document.querySelectorAll("[data-admin-logout]").forEach(function (button) {
        button.addEventListener("click", function () {
            window.location.href = "admin-login.html";
        });
    });
}

function setupAdminProducts() {
    const grid = document.getElementById("productGrid");
    const searchInput = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!grid || !searchInput || !categoryFilter) {
        return;
    }

    function filterProducts() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value.toLowerCase();

        grid.querySelectorAll(".product-card").forEach(function (product) {
            const productName = (product.dataset.name || product.textContent).toLowerCase();
            const tag = product.querySelector(".tag");
            const category = tag ? tag.textContent.toLowerCase().trim() : "";
            const matchesSearch = productName.includes(searchText);
            const matchesCategory = selectedCategory === "" || category === selectedCategory;
            const productColumn = product.parentElement || product;

            productColumn.classList.toggle("d-none", !(matchesSearch && matchesCategory));
        });
    }

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);

    grid.querySelectorAll("[data-delete-product]").forEach(function (button) {
        button.addEventListener("click", function () {
            const product = button.closest(".product-card");
            const productColumn = product && (product.parentElement || product);

            if (productColumn) {
                productColumn.remove();
            }
        });
    });
}

function setupAdminOrders() {
    const orderDetails = document.getElementById("orderDetails");

    document.querySelectorAll("[data-view-order]").forEach(function (button) {
        button.addEventListener("click", function () {
            const row = button.closest("tr");
            const cells = row ? row.querySelectorAll("td") : [];

            if (!orderDetails || cells.length < 6) {
                return;
            }

            setText(document.getElementById("detailOrderId"), cells[0].textContent.trim());
            setText(document.getElementById("detailCustomer"), cells[1].textContent.trim());
            setText(document.getElementById("detailItems"), cells[2].textContent.trim());
            setText(document.getElementById("detailTotal"), cells[3].textContent.trim());
            setText(document.getElementById("detailDate"), cells[4].textContent.trim());
            setText(document.getElementById("detailStatus"), cells[5].textContent.trim());
            orderDetails.hidden = false;
        });
    });
}

function setupAdminMessages() {
    const markAllButton = document.querySelector("[data-mark-all-read]");
    const messageGrid = document.querySelector(".message-grid");

    if (markAllButton && messageGrid) {
        markAllButton.addEventListener("click", function () {
            messageGrid.querySelectorAll(".badge").forEach(function (badge) {
                badge.textContent = "Read";
                badge.classList.remove("badge-blue", "badge-yellow", "badge-red");
                badge.classList.add("badge-green");
            });
        });
    }

    document.querySelectorAll("[data-archive-message]").forEach(function (button) {
        button.addEventListener("click", function () {
            const messageColumn = button.closest(".col-md-6");
            const message = messageColumn || button.closest(".panel");

            if (message) {
                message.hidden = true;
            }
        });
    });
}
