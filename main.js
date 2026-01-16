   const discoverText = document.querySelector("#intro p");
   const gridContainer = document.getElementById("attractionsContainer");


   const introSection = document.getElementById("intro");
    if (introSection) {
        introSection.style.paddingBottom = "2rem";
        introSection.style.paddingTop = "2rem";
        
    }
    
    const paragraphs = document.getElementsByTagName("p");
    if (paragraphs.length > 1) {
        paragraphs[1].style.lineHeight = "3";
    }
    
  
    const showTipBtn = document.createElement("button");
    showTipBtn.textContent = "Show Tip";
    showTipBtn.style.marginTop = "15px";
    showTipBtn.style.cursor = "pointer";
    
    if (discoverText) {
        discoverText.insertAdjacentElement("afterend", showTipBtn);
    }


    showTipBtn.addEventListener("click", showRandomTip);

    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "t") showRandomTip();
    });



    function showRandomTip() {
        if (document.getElementById("dailyTip")) return;

        const tips = [
            "Be ready for French and English.", 
            "Driving rules are a bit different.", 
            "Explore the underground city.", 
            "Taxes and tipping are extra."
        ];
        const randomIndex = Math.floor(Math.random() * tips.length);
        
        const tipPara = document.createElement("p");
        tipPara.id = "dailyTip";
        tipPara.textContent = tips[randomIndex];

        const randomColor = Math.random() > 0.5 ? "darkred" : "darkgreen";
        tipPara.style.color = randomColor;
        tipPara.style.fontWeight = "bold";

        const closeBtn = document.createElement("span");
        closeBtn.textContent = " [HIDE]";
        closeBtn.style.color = "blue";
        closeBtn.style.marginLeft = "10px";
        closeBtn.style.cursor = "pointer";

        closeBtn.addEventListener("click", (e) => {
            tipPara.remove();    
        });

        tipPara.appendChild(closeBtn);
        showTipBtn.insertAdjacentElement("afterend", tipPara);

       
        setTimeout(() => {
            const tip = document.getElementById("dailyTip");
            if (tip) tip.remove();
        }, 5000);
    }


    
    if (discoverText) {
        discoverText.addEventListener("click", (event) => {
            const element = event.currentTarget;
            element.classList.toggle("highlight-text");
            
            
            if (element.classList.contains("highlight-text")) {
                element.style.color = "#001f3f";
                element.style.fontWeight = "bold";
            } else {
                element.style.color = "";
                element.style.fontWeight = "normal";
            }
        });
    }


    const sizeRange = document.getElementById("sizeRange");
    if (sizeRange && discoverText) {
        sizeRange.addEventListener("input", () => {
            discoverText.style.fontSize = sizeRange.value + "px";
        });
    }


     const welcomeTitle = document.querySelector("#intro h2");

    if (welcomeTitle) {
       
        welcomeTitle.style.cursor = "help";
        welcomeTitle.title = "Click to inspect CSS";

        welcomeTitle.addEventListener("click", () => {
         
            const computed = window.getComputedStyle(welcomeTitle);

      
            alert(`Culoare: ${computed.color}\n` + 
                  `Font: ${computed.fontSize} ${computed.fontFamily}\n`);
        });
    }


    const loginBubbleBox = document.querySelector(".login-bubble");
    const loginInputs = document.querySelectorAll(".login-bubble input");

    if (loginBubbleBox && loginInputs.length > 0) {
        
        loginBubbleBox.addEventListener("click", () => {
            document.body.style.backgroundColor = "#555";
            document.body.style.transition = "background 0.5s";
            
            setTimeout(() => {
                document.body.style.backgroundColor = ""; 
            }, 1000);
        });

        loginInputs.forEach(input => {
            input.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });
    }


    const newsletterForm = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("emailInput");
    const numeInput = document.getElementById("numeInput");
    const prenumeInput = document.getElementById("prenumeInput");
    const formMessage = document.getElementById("formMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = emailInput.value;
            const nume = numeInput.value;
            const prenume = prenumeInput.value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const nameRegex = /^[a-zA-ZăâîșțĂÂÎȘȚ]+$/;

            if (!emailRegex.test(email)) {
                formMessage.style.color = "red";
                formMessage.textContent = "Invalid email format!";
                return;
            }
            

            if (!nameRegex.test(nume)) {
                formMessage.style.color = "red";
                formMessage.textContent = "Numele trebuie să conțină doar litere!";
                return;
            }

            if (!nameRegex.test(prenume)) {
                formMessage.style.color = "red";
                formMessage.textContent = "Prenumele trebuie să conțină doar litere!";
                return;
            }

            let subs = JSON.parse(localStorage.getItem("subscribers")) || [];
            subs.push({ email, nume, prenume });
            localStorage.setItem("subscribers", JSON.stringify(subs));

            formMessage.style.color = "green";
            formMessage.textContent = `Success! Total subs: ${subs.length}`;
            emailInput.value = "";
            numeInput.value = "";
            prenumeInput.value = "";
        });
    }



   
    if (gridContainer) {
        fetch("attractions.json")
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    const card = document.createElement("article");
                    card.className = "attraction-card";
                    card.innerHTML = `
                        <img src="${item.image}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    `;
                    gridContainer.appendChild(card);
                });
            })
            .catch(err => console.error("Eroare AJAX:", err));
    }


    const loginSection = document.getElementById("loginSection");
    const welcomeSection = document.getElementById("welcomeSection");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const userIn = document.getElementById("usernameInput");
    const passIn = document.getElementById("passwordInput");
    const displayUser = document.getElementById("displayUser");
    const loginMsg = document.getElementById("loginMsg");

    const sessionUser = localStorage.getItem("sessionUser");
    if (sessionUser) showWelcome(sessionUser);
    else showLogin();

    function showWelcome(u) {
        if(loginSection) loginSection.style.display = "none";
        if(welcomeSection) {
            welcomeSection.style.display = "block";
            displayUser.textContent = u;
        }
    }

    function showLogin() {
        if(loginSection) loginSection.style.display = "flex";
        if(welcomeSection) welcomeSection.style.display = "none";
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            fetch("users.json")
                .then(res => res.json())
                .then(users => {
                    const found = users.find(u => u.username === userIn.value && u.password === passIn.value);
                    if (found) {
                        localStorage.setItem("sessionUser", found.username);
                        showWelcome(found.username);
                        loginMsg.textContent = "";
                        userIn.value = "";
                        passIn.value = "";
                    } else {
                        loginMsg.textContent = "User sau parolă greșită!";
                        loginMsg.style.color = "red";
                    }
                })
                .catch(e => console.error("Eroare Login:", e));
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("sessionUser");
            showLogin();
        });
    }