const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("active");

    }
);


document.querySelectorAll(
    "#nav-menu a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove(
                "active"
            );

        }
    );

});


const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute(
                    "href"
                ) === "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);