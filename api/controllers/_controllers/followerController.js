'use strict'

const followerModel = require('../../models/follower')

async function AddFollower(req, res) {

  try {

    const response = await followerModel.insertMany({
      userId: req.body.userId,
      followerId: req.body.followerId
    })

    return res.status(200).send(response[0])

  } catch (error) {

    return res.status(500).send({
      message: `Error al dar like ${error}`
    })

  }

}

async function GetFollowerByUserId(req, res) {

  try {

    const response = await followerModel.find({ userId: req.params.userId })
    return res.status(200).send(response)

  } catch (error) {

    return res.status(200).send(error)

  }

}

async function RemoveFollower(req, res) {

  try {

    const response = await followerModel.findOneAndRemove({
      userId: req.body.userId,
      followerId: req.body.followerId
    })

    return res.status(200).send(response)

  } catch (error) {

    return res.status(500).send({
      message: `Error al dar like ${error}`
    })

  }

}

module.exports = {
  AddFollower,
  GetFollowerByUserId,
  RemoveFollower
}