import { VStack, FormLabel, Input, Button, Box, Text, Container, Flex } from '@chakra-ui/react'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'

const schema = yup
    .object({
        cpf: yup.string().required('O CPF é obrigatório'),
        password: yup.string().required('A senha é obrigatória')
    })
    .required()
type FormData = yup.InferType<typeof schema>

export function Login({setLoading}: {setLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [hasError, setHasError] = useState('')
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (credentials: FormData) => {
        setLoading(true)
        const { cpf, password } = credentials
        try {
            const request = await signIn('credentials', {
                redirect: false,
                cpf,
                password
            })

            setLoading(false)

            if (request && request.ok) {
                router.push('/')
            } else {
                setHasError('CPF ou senha invalida!')
            }
        } catch (error) {
            setHasError('Ocorreu um erro ao processar o login.')
        } 
    }

    return (
        <VStack>
            <Box w={'100%'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex borderRadius={5} justifyContent={'center'} alignItems={'center'} bg={'red.100'}>
                        <Text color={'red.500'}>{hasError}</Text>
                    </Flex>

                    <FormLabel mt={3}>CPF</FormLabel>
                    <Input {...register('cpf')} placeholder="Digite seu CPF" />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.cpf?.message}
                    </Text>
                    <FormLabel mt={'20px'}>Password</FormLabel>
                    <Input type="password" {...register('password')} placeholder="Digite sua senha" />
                    <Text mb={5} fontSize={'14px'} color={'red'}>
                        {errors.password?.message}
                    </Text>
                    <Button
                        type="submit"
                        color={'white'}
                        transition={'0.5s'}
                        _hover={{ bg: '#0a5c70' }}
                        bg={'#169ec0'}
                        w={'100%'}
                    >
                        Entrar
                    </Button>
                </form>
            </Box>
        </VStack>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions)

    if (!session) {
        return {
            props: {}
        }
    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}
