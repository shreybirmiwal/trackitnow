import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
   
  const TABLE_HEAD = ["Item Name", "Current Stock", "Update", "Delete"];
   
   
  export function InventoryTable({ inventoryData, itemStocks, setItemStocks, handleUpdateStock, handleDeleteItem }) {
    return (
      <Card className="h-full w-full">

        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
        </CardHeader>

        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryData.map(
                ({ itemName, stockAmount }, index) => {
                  const isLast = index === inventoryData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={itemName}>

                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {itemName}
                            </Typography>
    
                          </div>
                        </div>
                      </td>


                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {stockAmount}
                          </Typography>

                        </div>
                      </td>


                      <td className={classes}>
                        <div className="w-max">
                        test
                        </div>
                      </td>


                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                            <button
                              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                              onClick={() => handleDeleteItem(itemName)}
                            >
                              Delete
                            </button>
                        </Typography>
                      </td>

      
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>

      </Card>
    );
  }