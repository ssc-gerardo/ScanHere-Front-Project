const urlBase = 'http://localhost:8082'

async function getAllPromotions (token) {
  try {
    const response = await fetch(`${urlBase}/promotions`, {
      headers: {
        Authorization: token
      }
    })
    const parsedJson = await response.json()
    if (!parsedJson.success) {
      throw Error(parsedJson.error)
    }
    return parsedJson.data.promotion
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function getPromotionById (id, token) {
  try {
    const response = await fetch(`${urlBase}/promotions/${id}`, {
      headers: {
        Authorization: token
      }
    })
    const parsedJson = await response.json()
    if (!parsedJson.success) {
      throw Error(parsedJson.error)
    }
    return parsedJson.data.promotion
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function getPromotionsScansByUser (token, promotionId) {
  try {
    const response = await fetch(`${urlBase}/promotions/${promotionId}/scans/`, {
      headers: {
        Authorization: token
      }
    })
    const parsedJson = await response.json()
    if (!parsedJson.success) {
      throw Error(parsedJson.error)
    }
    return parsedJson.data.scans
  } catch (error) {
    console.error(error.message)
    throw error
  }
}
async function signup (newUserData) {
  try {
    const parsedData = {
      name: newUserData.Nombre,
      email: newUserData.Email,
      password: newUserData.password,
      city: newUserData.Ciudad,
      age: newUserData.Edad,
      gender: newUserData.gender
    }
    const response = await fetch(`${urlBase}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parsedData)
    })
    const parsedJson = await response.json()
    if (!parsedJson.success) {
      throw Error(parsedJson.error)
    }
    return parsedJson.data.user
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function login (userData) {
  try {
    const parsedData = {
      email: userData.Email,
      password: userData.password
    }
    const response = await fetch(`${urlBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parsedData)
    })
    const parsedJson = await response.json()
    if (!parsedJson.success) {
      throw Error(parsedJson.error)
    }
    return parsedJson.data.token
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function postScan (qr, promotionId, token) {
  try {
    const response = await fetch(`${urlBase}/scans`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qr,
        promotionId
      })
    })
    const parsedJson = await response.json()
    if (!parsedJson.success) {
      throw Error(parsedJson.error)
    }
    return parsedJson.data.scan
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

// verifica y saca las promociones del qr
async function getPromotionsByQr (token, qr) {
  try {
    const response = await fetch(`${urlBase}/scans/${qr}/promotions`, {
      headers: {
        Authorization: token
      }
    })
    const parsedJson = await response.json()
    if (!parsedJson.success) {
      throw Error(parsedJson.error)
    }
    return parsedJson.data.promotions
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export default {
  getAllPromotions,
  getPromotionById,
  getPromotionsScansByUser,
  postScan,
  signup,
  login,
  getPromotionsByQr
}
