document.addEventListener("DOMContentLoaded", function () {
  const cameraContainer = document.getElementById("cameraContainer");

  const minX = -200;
  const minY = -200;
  const maxX = 200;
  const maxY = 200;

  const popup = document.getElementById("popup");

  const movingBoxes = document.querySelectorAll(".movingBox");

  let centerX = cameraContainer.clientWidth / 2;
  let centerY = cameraContainer.clientHeight / 2;

  movingBoxes.forEach((box, index) => {
    const distance = (Math.random() + 4) * 40;
    const angle = (Math.PI * 2 * index) / movingBoxes.length;
    const randomX = Math.sin(angle) * distance;
    const randomY = Math.cos(angle) * distance;

    box.style.transform = `translate(${randomX}px, ${randomY}px)`;
    box.velocityX = 0;
    box.velocityY = 0;

    box.addEventListener("click", () => {
      openPopup(index);
    });
  });

  function updateBoxPositions() {
    centerX = cameraContainer.clientWidth / 2;
    centerY = cameraContainer.clientHeight / 2;

    clearLines();
    const repulsionStrength = 200;

    movingBoxes.forEach((box, index) => {
      drawLineToBox(box);

      const deltaX =
        0 -
        (parseFloat(box.style.transform.split("(")[1]) + box.clientWidth / 2);
      const deltaY =
        0 -
        (parseFloat(box.style.transform.split(",")[1]) + box.clientHeight / 2);

      const normalizedAttraction = normalizeVector(deltaX, deltaY);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      box.velocityX +=
        normalizedAttraction.x * 0.2 -
        (normalizedAttraction.x / distance) * 30 -
        (normalizedAttraction.y / distance) * 20;
      box.velocityY +=
        normalizedAttraction.y * 0.2 -
        (normalizedAttraction.y / distance) * 30 +
        (normalizedAttraction.x / distance) * 20;

      box.velocityX /= 1.2;
      box.velocityY /= 1.2;

      movingBoxes.forEach((otherBox, otherIndex) => {
        if (otherBox !== box) {
          const otherDeltaX =
            parseFloat(otherBox.style.transform.split("(")[1]) -
            parseFloat(box.style.transform.split("(")[1]);
          const otherDeltaY =
            parseFloat(otherBox.style.transform.split(",")[1]) -
            parseFloat(box.style.transform.split(",")[1]);
          const otherDistance = Math.sqrt(
            otherDeltaX * otherDeltaX + otherDeltaY * otherDeltaY
          );

          const repulsionForce =
            repulsionStrength / (otherDistance * otherDistance);

          box.velocityX -= repulsionForce * (otherDeltaX / otherDistance);
          box.velocityY -= repulsionForce * (otherDeltaY / otherDistance);
        }
      });

      const newX =
        parseFloat(box.style.transform.split("(")[1]) + box.velocityX * 0.5;
      const newY =
        parseFloat(box.style.transform.split(",")[1]) + box.velocityY * 0.5;

      box.style.transform = `translate(${newX}px, ${newY}px)`;
    });

    requestAnimationFrame(updateBoxPositions);
  }

  updateBoxPositions();

  function openPopup(boxIndex) {
    const box = movingBoxes[boxIndex];
    let link = document.createElement("a");
    link.href = "#";
    link.target = "_blank";
    let personInfo = document.createElement("p");
    personInfo.classList.add("grey");
    let linkedTitle = false;
    if (boxIndex === 0) {
      link.href = "";
      link.textContent = "Tulus";
      personInfo.innerText = "Cousin + very good friend :)"
    }
    if (boxIndex === 1) {
      link.href = "";
      link.textContent = "Mr. Tomo";
      personInfo.innerText = "Pretty cool dude 😎"
    }
    if (boxIndex === 2) {
      link.href = "";
      link.textContent = "Kesomannen";
      personInfo.innerText = "Game developer of all time 🎮"
    }
    if (boxIndex === 3) {
      link.href = "";
      link.textContent = "The Killer Squirrel";
      personInfo.innerText = "Great friend, truly one of the reallest squirrels i've ever met."
    }
    if (boxIndex === 4) {
      link.href = "";
      link.textContent = "Agenttamy";
      personInfo.innerText = "Real 🗣🔥🥶😭"
    }
    if (boxIndex === 5) {
      link.href = "";
      link.textContent = "E";
      personInfo.innerText = "E"
    }
    if (boxIndex === 6) {
      link.href = "";
      link.textContent = "Dimensional Space";
      personInfo.innerText = "Great game developer, great friend :)"
    }
    if (boxIndex === 7) {
      link.href = "";
      link.textContent = "PhiDra";
      personInfo.innerText = "The dragon of all time. 🐲🐉"
    }


    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
      popupContainer.classList.remove("disabled");
    }

    const popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = "";
    if (linkedTitle === false) {
      let text = document.createElement("p");
      text.innerText = link.textContent;
      popupContent.appendChild(text);
    } else {
      popupContent.appendChild(link);
    }
    popupContent.appendChild(personInfo);

    popup.classList.remove("show");

    setTimeout(() => {
      popup.classList.add("show");
    }, 10);
  }

  window.closePopup = function () {
    const popupContent = document.getElementById("popupContent");
    popup.classList.remove("show");

    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
      popupContainer.classList.add("disabled");
    }
  };

  function clearLines() {
    const existingLines = document.querySelectorAll(".connectingLine");
    existingLines.forEach((line) => {
      line.parentNode.removeChild(line);
    });
  }

  function drawLineToBox(box) {
    const line = document.createElement("div");
    line.className = "connectingLine";

    const boxRect = box.getBoundingClientRect();
    const boxCenterX =
      parseFloat(box.style.transform.split("(")[1]) + boxRect.width / 2;
    const boxCenterY =
      parseFloat(box.style.transform.split(",")[1]) + boxRect.height / 2;

    const angle = Math.atan2(boxCenterY, boxCenterX);
    const distance = Math.sqrt(boxCenterY ** 2 + boxCenterX ** 2);

    const opacity = 1 / (distance ** 2 / 10000);

    line.style.width = `${distance}px`;
    line.style.opacity = opacity;
    line.style.transform = `translate(${0}px, ${0}px) rotate(${angle}rad)`;

    cameraContainer.appendChild(line);
  }
});

function normalizeVector(x, y) {
  const length = Math.sqrt(x * x + y * y);
  if (length !== 0) {
    return { x: x / length, y: y / length };
  } else {
    return { x: 0, y: 0 };
  }
}