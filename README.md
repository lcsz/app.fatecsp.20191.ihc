# api-node

## Install

Installar os pacotes:

`$ npm install`

## Starting

### Production

`$ npm run start`

### Development

`$ npm run debug`

## Script de setup para produção

```bash
sudo yum -y install git
sudo yum -y install gcc gcc-c++ make
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum -y install nodejs

sudo cat << EOT >> ~/.ssh/id_git
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAtHHtZRNdaq0FlzE63nPSA4g1UDfkmdCz8v3HHs5mWP7Cbz/B
OZvxFweoPpcBn2FIaWSZQog7RnbuHcBQbK0bQh7GIt7E/B69Qi7uYOki/ex3TKH8
NYYk5Npp7Muil3h33b0yjoEp1h3RPEmqH8XWdpgC9sQIM/0sbtDtxoamqMn3xjHA
9E7koJltsbC3p9lpWdCz2i21cTZsTHb5pAs/n2U4s7Qod6wTXRxmsuL5IFznSuIi
uY2jWnSbAL+ybSQLQgqDUjfi4AFk2ej3QJHgG7295TbNid48l6JoS8vLoC6a1bZx
4X1MZK+5y3EC9sfuLOKRDAP7g7bJWXrOtxsPJwIDAQABAoIBABwSrXBQNvRlvrzq
99GsCzxpcIHucC5N/fEL8nKkgd/OoslUDee8jyGaG17Bd4soQ2/CKuXi8/XeguU2
Ck0eEWOUDhdWuSbQUXl+e6+wFbWTmGvft7FMEWlZYalpdP5Dy8I/sSHijnO1Z9wN
Sd5vlRIWTD+/99a+yK7k6lk8kakon8f/bUGnt9heaAV+9r4wPtS3v5MzBIRpEpiL
IR6urcVH5g90x4eltMIngNVo0KmbACSMeuJIxdDtgNBnUOy81TpvfqPyHOPj7YnF
Y5xYzPNT38Co2EmHcID1jyNi98ddOXupEbrsfyv8pVwZMULI8Ys2nkY1DsrZo+03
p+emiSECgYEA54gMAjOTdwswsDcRcU3znuEE8T9S+UI8aEkvdU9xFdXwCk7RXyra
hgDVROIoDKmOXzumEpyCBINTcktSLlLRylACBcBwEsMdQCjxu5LO/36YY+oalMfT
b3SmyIUDxjiOD+RmyyRCjflfyg0nVln8D6hqiMkjfjjnOUDLRDcY+psCgYEAx4PE
MdH7XYMsrBtWjm6cprGtBVFftqyTmbc1mSy8ZiW2YLn7BAq0HZVqtdQae4Ssvhpd
7DCjXrjqrm+GMFdwopVRE1Ox5dswPAyWFMSmOMoeWCjkW6YHVeoWPG0LB6f6ghUZ
4rJtaL0rJQ3D9zvTF48ClyeTiKSvqAce5DPrkGUCgYEA2o/5FhLuABCWM6KoWpdF
hRPSAJLQlvBJ6gA8Rrdpfz1nzbM9vmLLynf6233KZLmi5o9+ZE9OBUibe2dS+tu/
owYIArn4kh2R/UEpgPJDabhtztPtp8lC9RHfZ6b5OyOkJ6hqyRU/pppkLG5iVge4
BGftuZZ2ZO7+h3N87rY8ZEUCgYEAqwtbEv8bSbMghDg3v4oywHIIjEuUC+7t51V7
HOOObOAd99TZz0BB5C7puhKp1YUL9zpxlQCpvpY3k+5Gk4ETLj9mr3QMSqvcMU71
B78DZiJZW2lLRQsUtOInyAwP7bNj/0uJ0qD3TVkH+Q9RFs7yDPts1Bt4zyeo9BuO
r0OXy0UCgYEAxluR+QlDTjJbtHLDXsChkqfh91Jy4Ce82Tr96XyvC/N9RWm6Zjoh
4WrdI8ejneqqiTGekH3eldWmMD7OCdfjJ6oAAAOJFproN/TViBvyzDRJ1RZtSGIK
UEkrH4jDtDZL3I2QFk6pvospszI9t/xr3FcPaAo9HZbLPLcJ4ou/Ch0=
-----END RSA PRIVATE KEY-----
EOT

chmod 400 ~/.ssh/id_git
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_git

mkdir repo
cd repo
git clone git@bitbucket.org:lcsz_dev/api-node.git api-node
cd api-node

sudo npm install -g forever
npm install
npm run build
forever start dist/index.js
```
