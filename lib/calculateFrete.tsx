'use server'

export async function calculateFrete(cepDestino: string) {
  const url = 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate'
  const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWRkMzk1ZWEzY2YxZjJiZjVkOTQ5Y2ViNWNjMDZjOWZlOTliZjdmNjU2NGMyNjNmYjI4NDI4OWYzY2FiNmQyZmE2MzY3MmRmOTE2MWJiMzciLCJpYXQiOjE3NDgzODk1NjIuOTkyNjEsIm5iZiI6MTc0ODM4OTU2Mi45OTI2MTEsImV4cCI6MTc3OTkyNTU2Mi45ODAyOTQsInN1YiI6IjlmMDNkNTU2LTgxODgtNGI4ZC05YzAxLTA1NmRiMzkxMzYzNiIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.e5ofvhumv4sO8h3xRLk44BYl5UWBwa02NW-dVB6_xPDJlCsx9z1eqGcevqnqEKn-5h7b_vfhSObhEU_iZTo3ISFfcDlNqV8AyAbE4nHogDLEdQhmEvwilaQkWbif06awvkA0hZGA7XVUDeyOQXrAlEP_z07mCWsZqJbOeJ6sTFPDoDCYmtddnB6QGA4KBStYCtjLA4PfyYm07x-7Gqei4qIB4ugkBD0j4CYM981nmPktkitI-fqET_RUlUfwlinfmV6ZRwDfec5EODFP8m4tzIKg5EWfjRl1bSdjj0rb_OhqvNCb88BVk77fjqjJPE6nMaXPYay9hpSexrPWy4mhvoF4zHk7ZNSCYXGoK2XQV8-1Khlwn8osw_CKy4rWir3QipaEgBHg7OIs03JrhIPAB2tuD9mMRa2LU4LERrRbvzkh5JljijDNsP86yze8GhNUHSWuKFLeCC7hjCYBap3t5_vxJprCbAOdjPTrsc3r6RTcb6yV4hp4nkQ9wV_GFiugf0b_DMHRgckP-rkJD_vR4m56hVXo3X_WvXmuwtbEPT-Vhm7tp50YQOWEbLDjbfY9L20aYMkjj5aJwvw0BJKX4MFGbqFkUswlykzMM9CuhPLSPEUYslc9cl6pMQVIV14KuaP5PEJry9Witgan0vH4o8JiPl11nWUqni_3UXl0Fkw'  // ✅ coloque seu token

  const body = {
    from: { postal_code: "95745000" },
    to: { postal_code: cepDestino },
    package: {
      height: 4,
      width: 12,
      length: 17,
      weight: 0.3
    }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': token,
        'Content-Type': 'application/json',
        'User-Agent': 'Aplicacao seu@email'
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro:', data)
      throw new Error(`Erro HTTP: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Erro ao calcular frete:', error)
    throw error
  }
}
