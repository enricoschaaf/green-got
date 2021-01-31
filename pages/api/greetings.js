// @ts-check

import { NextApiRequest, NextApiResponse } from "next"

/**
 *  @param {NextApiRequest} req
 *  @param {NextApiResponse} res
 */
export default ({ query, method }, res) => {
  if (method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: { message: "Method Not Allowed" } })
  }

  if (typeof query.first_name !== "string" || query.first_name.length < 1) {
    return res.status(422).json({ error: { message: "Unprocessable Entity" } })
  }

  res.json({ payload: `Hello ${query.first_name}!` })
}
