# replace version
cd alist-web
version=$(git describe --abbrev=0 --tags)
sed -i -e "s/0.0.0/$version/g" package.json
cat package.json

# build
pnpm install
wget https://crowdin.com/backend/download/project/alist/zh-CN.zip
unzip zh-CN.zip
node ./scripts/i18n.mjs
rm zh-CN.zip
pnpm build
cp -r dist ../
cd ..

# commit to web-dist
cd web-dist
rm -rf dist
cp -r ../dist .
git add .
git config --local user.email "247777055@qq.com"
git config --local user.name "HanTx"
git commit --allow-empty -m "upload $version dist files" -a
git tag -a $version -m "release $version"
cd ..

mkdir compress
tar -czvf compress/dist.tar.gz dist/*
zip -r compress/dist.zip dist/*