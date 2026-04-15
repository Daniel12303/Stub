let selectedMeal = ""
let mealContainerArray = document.querySelectorAll('.mealContainers')

setFoodNames()

for (let i = 0; i < mealContainerArray.length; i++) {
  let containerId = mealContainerArray[i]['id']

  document.getElementById(containerId).addEventListener('click', () => {
    const mealList = ['breakfast', 'amsnack', 'lunch', 'pmsnack', 'dinner']
    selectedMeal = containerId.substring(0, containerId.indexOf('C'))

    fetchImage(selectedMeal)

    let mealName = `${selectedMeal}Name`

    document.getElementById(containerId).style.width = "20%"
    document.getElementById(`${mealList[i]}Name`).style.margin = "margin: 0 0"
    document.getElementById(`${mealList[i]}Text`).style.margin = "margin: 0 0"
    document.getElementById(mealName).style.fontSize = "1.6rem"

    for (let i = 0; i < mealList.length; i++) {
      if (mealList[i] == selectedMeal)
        continue

      document.getElementById(`${mealList[i]}Container`).style.width = "15%"
      document.getElementById(`${mealList[i]}Name`).style.margin = "margin: 2% 0"
      document.getElementById(`${mealList[i]}Text`).style.margin = "margin: 2% 0"
      document.getElementById(`${mealList[i]}Name`).style.fontSize = "1.3rem"
    }
  })
}

async function setFoodNames() {
  const { breakfastMeal, am_snackMeal, lunchMeal, pm_snackMeal, dinnerMeal } = await getFood()

  document.getElementById("breakfastName").textContent = breakfastMeal
  document.getElementById("amsnackName").textContent = am_snackMeal
  document.getElementById("lunchName").textContent = lunchMeal
  document.getElementById("pmsnackName").textContent = pm_snackMeal
  document.getElementById("dinnerName").textContent = dinnerMeal
}

//fetch functions

async function fetchImage(meal) {
  try {
    const response = await fetch(`/api/qrCreator/${meal}`)

    if (!response.ok)
      throw new Error('Fetch Failed')

    const blob = await response.blob()
    const imageObjectURL = URL.createObjectURL(blob)
    document.getElementById('qrImage').src = imageObjectURL
  }
  catch (error) {
    console.log(error.message)
  }
}

async function getFood() {
  try {
    const response = await fetch("/api/getDayFood")
    if (!response.ok)
      throw new Error('Fetch Failed')

    const data = await response.json()
    return data
  }
  catch (error) {
    console.log(error.message)
  }
}