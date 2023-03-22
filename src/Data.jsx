const liveFlows = [
    
    

    {
        id: 8,
        name: 'Origin',
        version: 'V1',
        published: false,
        dateMade: '5/4/2019'
    },
    {
        id: 9,
        name: 'Test',
        version: 'V2',
        published: false,
        dateMade: '1/3/2019'
    },
    {
        id: 10,
        name: 'Test',
        version: 'V1',
        published: false,
        dateMade: '1/2/2019'
    },
    {
        id: 1,
        name: 'Flow 1',
        version: 'V2',
        published: true,
        dateMade: '11/2/2020'
    },
    {
        id: 2,
        name: 'Flow 3',
        version: 'V1',
        published: true,
        dateMade: '1/7/2020'
    },
    {
        id: 3,
        name: 'Gratitude',
        version: 'V2',
        published: true,
        dateMade: '12/2/2019'
    },
    {
        id: 4,
        name: 'Flow 3',
        version: 'V7',
        published: false,
        dateMade: '4/2/2019'
    },
    {
        id: 5,
        name: 'Smile 1',
        version: 'V1',
        published: true,
        dateMade: '3/6/2019'
    },
    {
        id: 6,
        name: 'Gratitude',
        version: 'V1',
        published: false,
        dateMade: '12/2/2018'
    },    
    {
        id: 7,
        name: 'Flow 1',
        version: 'V2',
        published: true,
        dateMade: '12/2/2019'
    },
]

import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';

const options = [
                {
                  Id: 1,
                  Name: 'Text Box',
                  Icon: <TextSnippetOutlinedIcon fontSize ='large'/>
                },
                {
                  Id: 2,
                  Name: 'Text Input',
                  Icon: <AssignmentOutlinedIcon fontSize ='large'/>
                }
                // {
                //   Id: 3,
                //   Name: 'Word Input',
                //   Icon: <TextsmsOutlinedIcon fontSize ='large'/>
                // }
                ]

export {liveFlows, options};