function renderDinamic(array, list, callback) {
  const ul = document.querySelector(list);
  ul.innerHTML = "";

  array.forEach((element) => {
    const create = callback(element);

    ul.appendChild(create);
  });
}

function createJobCard(obj) {
  const { id, title, enterprise, location, description, modalities } = obj;

  const li = document.createElement("li");
  li.classList.add("job");

  const divTop = document.createElement("div");
  divTop.classList.add("job__top");

  const elTitle = document.createElement("p");
  elTitle.classList.add("__title-4");
  elTitle.textContent = title;

  const jobLocals = document.createElement("div");
  jobLocals.classList.add("job__locals");

  const elCorp = document.createElement("span");
  elCorp.classList.add("__text-3");
  elCorp.textContent = enterprise;

  const elLocal = document.createElement("span");
  elLocal.classList.add("__text-3");
  elLocal.textContent = location;

  const elDesc = document.createElement("p");
  elDesc.classList.add("__text-2");
  elDesc.textContent = description;

  const divBottom = document.createElement("div");
  divBottom.classList.add("job__bottom");

  const elModDiv = document.createElement("div");
  elModDiv.classList.add("job__modality-div");

  if (modalities && modalities.length > 0) {
    modalities.forEach((modality) => {
      const elModality = document.createElement("p");
      elModality.classList.add("job__modality", "__text-3");
      elModality.textContent = modality;

      divBottom.append(elModDiv, elModality);
      elModDiv.appendChild(elModality);
    });
  }

  const applyBtn = document.createElement("button");
  applyBtn.title = "Candidatar";
  applyBtn.classList.add("apply", "remove", "brand__btn", "__text-2");
  applyBtn.textContent = "Candidatar";
  applyBtn.dataset.id = id;

  li.append(divTop, elTitle, jobLocals, elDesc, divBottom);
  divTop.append(elTitle, jobLocals);
  jobLocals.append(elCorp, elLocal);
  divBottom.append(applyBtn);

  return li;
}

function createSelectedJobCard(obj) {
  const id = obj.id;
  const title = obj.title;
  const enterprise = obj.enterprise;
  const local = obj.location;

  const li = document.createElement("li");
  li.classList.add("job__selected");

  const slJobInfo = document.createElement("div");
  slJobInfo.classList.add("job__info");

  const slTitle = document.createElement("p");
  slTitle.classList.add("__title-4");
  slTitle.innerText = title;

  const sljobLocals = document.createElement("div");
  sljobLocals.classList.add("job__locals");

  const slCorp = document.createElement("span");
  slCorp.classList.add("__text-3");
  slCorp.innerText = enterprise;

  const slLocal = document.createElement("span");
  slLocal.classList.add("__text-3");
  slLocal.innerText = local;

  li.append(slJobInfo, slTitle, sljobLocals, slCorp, slLocal);

  slJobInfo.append(slTitle, sljobLocals);
  sljobLocals.append(slCorp, slLocal);

  return li;
}

function applyJob() {
  const buttons = document.querySelectorAll(".apply, .btn__remove");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (button.innerText === "Remover candidatura") {
        button.innerText = "Candidatar";
        button.title = "Candidatar";
        const cardId = Number(event.target.dataset.id);
        const cardIndex = selectedJobsCard.findIndex(
          (card) => card.id === cardId
        );

        if (cardIndex !== -1) {
          selectedJobsCard.splice(cardIndex, 1);
          localStorage.setItem(
            "@webWomen:applies",
            JSON.stringify(selectedJobsCard)
          );
          renderDinamic(
            selectedJobsCard,
            ".jobs__selected-list",
            createSelectedJobCard
          );
          checkSelectedJobs();
          setupRemoveButtons();
        }
      } else {
        button.innerText = "Remover candidatura";
        button.title = "Remover candidatura";
        const cardFind = jobsData.find(
          (card) => card.id === Number(event.target.dataset.id)
        );

        const cardSelected = {
          ...cardFind,
          slCardId: selectedJobsCard.length + 1,
        };

        selectedJobsCard.push(cardSelected);
        localStorage.setItem(
          "@webWomen:applies",
          JSON.stringify(selectedJobsCard)
        );
        renderDinamic(
          selectedJobsCard,
          ".jobs__selected-list",
          createSelectedJobCard
        );
      }
    });
  });
}

function checkSelectedJobs() {
  const ul = document.querySelector(".jobs__selected-list");

  const selectedList = document.createElement("div");
  selectedList.classList = "job__empty-applies";

  const checkMessage = document.createElement("p");
  const skeletonBody = document.createElement("img");

  if (selectedJobsCard.length === 0) {
    checkMessage.textContent = "Não há vagas selecionadas";
    skeletonBody.src = "/assets/img/no-items skeleton.svg";

    ul.append(selectedList, checkMessage, skeletonBody);
    selectedList.append(checkMessage, skeletonBody);
  }
}

renderDinamic(jobsData, ".jobs__list", createJobCard);
applyJob();
checkSelectedJobs();
