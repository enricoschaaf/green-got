// @ts-check

import { NextApiRequest, NextApiResponse } from "next"
import { capitalize } from "../../utils/capitalize"

/**
 *  @param {NextApiRequest} req
 *  @param {NextApiResponse} res
 */
export default (req, res) => {
  const { body, method } = req

  if (method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: { message: "Method Not Allowed" } })
  }

  if (
    typeof body.firstName !== "string" ||
    body.firstName.length < 1 ||
    typeof body.lastName !== "string" ||
    body.lastName.length < 1
  ) {
    return res.status(422).json({ error: { message: "Unprocessable Entity" } })
  }

  res.json({
    payload: {
      Firstname: capitalize(body.firstName),
      Lastname: capitalize(body.lastName),
    },
  })
}
