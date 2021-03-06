import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { getCustomRepository, useContainer } from 'typeorm'

import CarRepository from '../repositories/CarRepository'

class CarController {
  async create(request: Request, response: Response) {
    const carRepository = getCustomRepository(CarRepository)

    const { name, brand, model, price } = request.body
    const filename = request.file?.filename
    const avatar = `http://localhost:3333/api/cars/photos/${filename}`

    const car = carRepository.create({
      name,
      brand,
      model,
      price,
      avatar,
    })

    try {
      await carRepository.save(car)
    } catch (err) {
      console.warn('Erro ao Salvar o Carro!')
    }

    return response.json(car)
  }

  async show(request: Request, response: Response) {
    const carRepository = getCustomRepository(CarRepository)
    const { name } = request.params

    const car = await carRepository.findOne({ where: { name } })

    if (!car) return response.status(401).json({ error: 'Car is not exist!' })

    return response.json(car)
  }

  async index(request: Request, response: Response) {
    const carRepository = getCustomRepository(CarRepository)

    const cars = await carRepository.find({ order: { price: 'DESC' } })

    return response.json(cars)
  }

  async delete(request: Request, response: Response) {
    const carRepository = getCustomRepository(CarRepository)
    const { id } = request.params

    await carRepository.delete(id)

    return response.json({ message: 'Deleted car.' })
  }

  async update(request: Request, response: Response) {
    const carRepository = getCustomRepository(CarRepository)
    const { id } = request.params
    const filename = request.file?.filename
    const avatar = `http://localhost:3333/api/cars/photos/${filename}`
    const { name, brand, model, price } = request.body

    const carExist = await carRepository.findOne(id)

    if (!carExist)
      return response.status(400).json({ message: 'Car note found!' })
    console.log(filename)

    const avatarNew = filename === undefined ? carExist.avatar : avatar

    const car = await carRepository.update(id, {
      name,
      brand,
      model,
      price,
      avatar: avatarNew,
    })

    if (car.affected) return response.json({ massage: 'Updated car.' })
  }
}

export default new CarController()
