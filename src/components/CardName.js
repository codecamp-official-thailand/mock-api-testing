import React, { useEffect, useState } from 'react'
import {Button, Card} from 'antd'
import axios from 'axios'
import {DeleteOutlined} from '@ant-design/icons'

function CardName() {

    const [data, setData] = useState(null)

    const fetchData = async() => {
        try{
            const response = await axios.get('https://604227ef7f50e000173abca6.mockapi.io/company')
            console.log(response)
            setData({
                items: response.data,
                loaded: true
            })
        }catch(err){
            setData({
                err,
                loaded: true
            })
        }
    }

    const handleDelete = async(itemId) => {
        await axios.delete(`https://604227ef7f50e000173abca6.mockapi.io/company/${itemId}`)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div style={{display:"flex", flexFlow: "wrap", justifyContent:"center"}}>
            { data?.items?.map(itm => (
                <Card 
                title={itm.name}
                style={{width: '300px'}}
                extra={
                    <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(itm.id)}
                    ></Button>
                }
                >
                    <p>job: {itm.job}</p>
                    <p>company: {itm.company}</p>
                </Card>
            ))
        }
        </div>
    )
}

export default CardName
