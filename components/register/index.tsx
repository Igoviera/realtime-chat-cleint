import { Button, FormLabel, Input, VStack, Text, Box, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { Context } from '../../context/context'
import { User } from '../../types/user'

const schema = yup
    .object({
        name: yup.string().required('O nome é obrigatório'),
        email: yup.string().required('O e-mail é obrigatório'),
        cpf: yup.string().required('O CPF é obrigatório'),
        password: yup.string().required('A senha é obrigatória')
    })
    .required()
type FormData = yup.InferType<typeof schema>

export function Register() {
    const [alert, setAlert] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post(`http://localhost:5000/cadastrar/user`, data)
            if (response) {
                setAlert('')
                setAlert(`${response.data.message}, volte para o login`)
            }
        } catch (error: any) {
            setAlert(error.response.data.message)
            console.log(error.response.data.message)
        }
    }

    return (
        <VStack spacing="5px">
            <Box w={'100%'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {alert && (
                        <Flex
                            borderRadius={5}
                            p={'9px'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            bg={'green.100'}
                        >
                            <Text textAlign={'center'} color={'green.500'}>
                                {alert}
                            </Text>
                        </Flex>
                    )}

                    <FormLabel mt={5}>Name</FormLabel>
                    <Input maxLength={55} {...register('name')} placeholder="Digite seu nome" />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.name?.message}
                    </Text>
                    <FormLabel mt={'20px'}>Email Address</FormLabel>
                    <Input
                        maxLength={55}
                        {...register('email')}
                        type="email"
                        placeholder="Digite um e-mail"
                    />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.email?.message}
                    </Text>
                    <FormLabel mt={'20px'}>CPF</FormLabel>
                    <Input type="number" maxLength={14} {...register('cpf')} placeholder="Digite seu CPF" />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.cpf?.message}
                    </Text>
                    <FormLabel mt={'20px'}>Password</FormLabel>
                    <Input maxLength={55} {...register('password')} placeholder="Digite uma senha" />
                    <Text mb={5} fontSize={'14px'} color={'red'}>
                        {errors.password?.message}
                    </Text>
                    <Button
                        type="submit"
                        color={'white'}
                        transition={'0.5s'}
                        _hover={{ bg: '#178d89' }}
                        bg={'#59C2BE'}
                        w={'100%'}
                    >
                        Cadastrar
                    </Button>
                </form>
            </Box>
        </VStack>
    )
}
