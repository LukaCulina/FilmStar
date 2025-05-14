import Pagination from '@mui/material/Pagination';

const CustomPagination = ({setPage, numOfPages = 10}) => {
    const handlePageChange  = (page) =>{
        setPage(page);
        window.scroll(0, 0);
    }

    return ( 
        <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
                color:"white !important" 
            }}
        >
            <Pagination
                count={numOfPages} 
                onChange={(event, value) => handlePageChange(value)}
                color="primary"
                sx={{
                    "& .css-wjh20t-MuiPagination-ul button": {
                        color: "white",
                    },
                    "& .css-1omp2b7": {
                        color: "white",
                    },
                }}
            />
        </div>
    );
}
 
export default CustomPagination;
