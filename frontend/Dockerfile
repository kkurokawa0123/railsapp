FROM node:22.19.0

# 作業ディレクトリの設定
RUN mkdir /todoapp
WORKDIR /todoapp

# パッケージファイルをコピー
COPY package.json package-lock.json /todoapp/
# # 依存関係をインストール
RUN npm install

CMD ["npm","run","dev"]