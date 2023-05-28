import {
    VStack,
    FormLabel,
    Input,
    Button,
    Box,
    Text,
    Flex,
    InputRightElement,
    InputGroup
} from '@chakra-ui/react'

import { useContext, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Context } from '../../context/context'

const schema = yup
    .object({
        cpf: yup.string().required('O CPF é obrigatório'),
        password: yup.string().required('A senha é obrigatória')
    })
    .required()
type FormData = yup.InferType<typeof schema>

export function Login() {
    const { setLoading }: any = useContext(Context)
    const [hasError, setHasError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
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

            if (request && request.ok) {
                router.push('/')
            } else {
                setLoading(false)
                setHasError('CPF ou senha invalida!')
            }
        } catch (error) {
            setLoading(false)
            setHasError('Error')
        }
    }

    const isPassword = () => setShowPassword(!showPassword)

    return (
        <VStack>
            <Box w={'100%'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex borderRadius={5} justifyContent={'center'} alignItems={'center'} bg={'red.100'}>
                        <Text color={'red.500'}>{hasError}</Text>
                    </Flex>

                    <FormLabel mt={3}>CPF</FormLabel>
                    <Input maxLength={14} {...register('cpf')} placeholder="Digite seu CPF" />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.cpf?.message}
                    </Text>
                    <FormLabel mt={'20px'}>Password</FormLabel>
                    <InputGroup>
                        <Input
                            maxLength={55}
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            placeholder="Digite sua senha"
                        />
                        <InputRightElement>
                            <Box cursor={'pointer'} onClick={isPassword}>
                                {showPassword ? (
                                    <AiOutlineEye color="#6d6d6dcc" size={20} />
                                ) : (
                                    <AiOutlineEyeInvisible color="#6d6d6dcc" size={20} />
                                )}
                            </Box>
                        </InputRightElement>
                    </InputGroup>

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
