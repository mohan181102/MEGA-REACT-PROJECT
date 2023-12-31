import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authconfig from '../Appwrite/Config';
import Container from '../components/Container';
import Button from '../components/Buttn';
import parse from 'html-react-parser'
import authservice from '../Appwrite/Auth';


export default function Post(){
    const [post,setpost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state)=>state.auth.userdata);
    
    // const isauthor = post ? true :false;
    const isauthor = authservice.getcurrentuser()

    useEffect(()=>{
        if(slug){
            authconfig.getpost(slug).then((post)=>{
                if(post) setpost(post);
                else navigate('/');
            })
        }else navigate('/')
    },[slug,navigate]);

    function deletePost(){
        authconfig.deletepost(slug)
    }

    return post && isauthor ? (
        <div className='py-8'>
            <Container>
                <div className=' w-4/5 flex justify-center mb-4 mx-auto relative border rounded-xl p-2 flex-wrap'>
                    <img 
                        src={authconfig.getfile(post.featuredimg)}
                        alt={post.title}
                        className='rounded-xl'
                    />

                    {isauthor? (
                        <div className='absolute right-6 top-6'>
                            <Link>
                                <Button bgcolor='bg-red-400' onClick={deletePost}>
                                    Delete
                                </Button>
                            </Link>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor='py-2 bg-yellow-400'>
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    ): null}
                    <div className='w-full mb-6'>
                        <h1 className='text-2xl font-bold'>{post.title}</h1>
                    </div>
                    <div className={`text-lg h-auto p-4`}>
                        {parse(post.conntent)}
                    </div>

                </div>
                
            </Container>
        </div>
    ):null
}