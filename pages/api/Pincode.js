



export default function Pincode(req, res) {
    let data = {
        "234400": ["", ""], "721302": ["Kharagpur", "West Bengal"], "110003": ["Delhi", "Delhi"], "560017": ["Bangalore", "Karnataka"], "335524": ["Hanumangrah", "Rajsthan"]
    }



    if (req.query.type == "full") {
        res.json(data)

    } else {

        let response = []

        for (const key in data) {
            response.push(parseInt(key))
        }

        res.send(response)
    }



}
